<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Entrance;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EntranceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entrances = Entrance::with('user')->get();
        return response()->json($entrances, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'date_of_entry' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'nullable',
            'time_spent' => 'nullable|integer',
        ]);
        
        $entrance = Entrance::create($validated);
        return response()->json($entrance, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $entrance = Entrance::with('user')->find($id);
        if ($entrance) {
            return response()->json($entrance, 200);
        }
        return response()->json(['message' => 'Entrance not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $entrance = Entrance::find($id);
        if ($entrance) {
            $entrance->update($request->all());
            return response()->json($entrance, 200);
        }
        return response()->json(['message' => 'Entrance not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $entrance = Entrance::find($id);
        if ($entrance) {
            $entrance->delete();
            return response()->json(['message' => 'Entrance deleted'], 200);
        }
        return response()->json(['message' => 'Entrance not found'], 404);
    }

    /**
     * Get active streak statistics for the specified user.
     */
    public function getStreakStats(string $userId)
    {
        // Pobieramy wejścia posortowane od najnowszego
        $entrances = Entrance::where('user_id', $userId)
            ->orderBy('date_of_entry', 'desc')
            ->get(['date_of_entry', 'time_spent']);

        if ($entrances->isEmpty()) {
            return response()->json([
                'streak_start' => null,
                'streak_end' => null,
                'days_in_a_row' => 0,
                'total_time_spent' => '00:00:00'
            ]);
        }

        $uniqueDates = $entrances->pluck('date_of_entry')->unique()->values();
        
        $today = Carbon::today()->toDateString();
        $yesterday = Carbon::yesterday()->toDateString();

        // Sprawdzamy czy użytkownik był dzisiaj lub wczoraj (warunek aktywnego streaka)
        $hasToday = $uniqueDates->contains($today);
        $hasYesterday = $uniqueDates->contains($yesterday);

        if (!$hasToday && !$hasYesterday) {
            return response()->json([
                'streak_start' => null,
                'streak_end' => null,
                'days_in_a_row' => 0,
                'total_time_spent' => '00:00:00'
            ]);
        }

        // Zaczynamy liczenie od dzisiaj lub wczoraj
        $currentDate = Carbon::parse($hasToday ? $today : $yesterday);
        $streakStart = $currentDate->copy();
        $streakEnd = $currentDate->copy();
        $daysInARow = 0;
        
        // Zbieramy unikalne dni należące do obecnej serii
        $streakDates = [];

        while ($uniqueDates->contains($currentDate->toDateString())) {
            $dateStr = $currentDate->toDateString();
            $streakDates[] = $dateStr;
            
            $streakStart = $currentDate->copy(); // Przesuwamy początek serii wstecz
            $daysInARow++;
            $currentDate->subDay(); // Cofamy się o 1 dzień
        }

        // Sumujemy spędzony czas tylko dla dni wchodzących w skład serii
        $totalSeconds = 0;
        foreach ($entrances as $entrance) {
            if (in_array($entrance->date_of_entry, $streakDates)) {
                if (!empty($entrance->time_spent)) {
                    $parts = explode(':', $entrance->time_spent);
                    $totalSeconds += ($parts[0] * 3600) + ($parts[1] * 60) + ($parts[2] ?? 0);
                }
            }
        }

        // Zamiana sekund z powrotem na format HH:MM:SS
        $hours = floor($totalSeconds / 3600);
        $minutes = floor(($totalSeconds / 60) % 60);
        $seconds = $totalSeconds % 60;
        $totalTimeSpent = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);

        return response()->json([
            'streak_start' => $streakStart->toDateString(),
            'streak_end' => $streakEnd->toDateString(),
            'days_in_a_row' => $daysInARow,
            'total_time_spent' => $totalTimeSpent
        ]);
    }

    /**
     * Get weekly attendance statistics for the specified user (last 7 days).
     */
    public function getWeeklyStats(string $userId)
    {
        // 1. Pobieramy wejścia z ostatnich 7 dni
        $startDate = Carbon::today()->subDays(6)->toDateString();
        $endDate = Carbon::today()->toDateString();

        $entrances = Entrance::where('user_id', $userId)
            ->whereBetween('date_of_entry', [$startDate, $endDate])
            ->get(['date_of_entry', 'time_spent']);

        // Grupa wejść po dacie i zsumowanie sekund
        $groupedSeconds = [];
        foreach ($entrances as $entrance) {
            $date = $entrance->date_of_entry;
            if (!isset($groupedSeconds[$date])) {
                $groupedSeconds[$date] = 0;
            }
            if (!empty($entrance->time_spent)) {
                $parts = explode(':', $entrance->time_spent);
                $seconds = ($parts[0] * 3600) + ($parts[1] * 60) + ($parts[2] ?? 0);
                $groupedSeconds[$date] += $seconds;
            }
        }

        // 2. Generujemy ostatnie 7 dni kalendarzowych (od 6 dni temu do dzisiaj)
        $polishDays = [
            1 => 'Pon',
            2 => 'Wt',
            3 => 'Śr',
            4 => 'Czw',
            5 => 'Pt',
            6 => 'Sob',
            7 => 'Ndz',
        ];

        $stats = [];
        for ($i = 6; $i >= 0; $i--) {
            $dateObj = Carbon::today()->subDays($i);
            $dateStr = $dateObj->toDateString();
            
            $totalSeconds = $groupedSeconds[$dateStr] ?? 0;
            
            // Format time_spent as HH:MM:SS
            $hours = floor($totalSeconds / 3600);
            $minutes = floor(($totalSeconds / 60) % 60);
            $seconds = $totalSeconds % 60;
            $timeSpentStr = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
            
            // Decymalne godziny do wykresu (np. 1.5)
            $decimalHours = round($totalSeconds / 3600, 2);

            $stats[] = [
                'calendar_date' => $dateStr,
                'name' => $polishDays[$dateObj->dayOfWeekIso],
                'time' => $decimalHours,
                'time_spent' => $timeSpentStr
            ];
        }

        return response()->json($stats);
    }
}

