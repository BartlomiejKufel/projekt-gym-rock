<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class EventParticipantController extends Controller
{
    /**
     * Zapisz użytkownika na wydarzenie.
     */
    public function register(Request $request, $eventId)
    {
        $validated = $request->validate([
            'participant_id' => 'required|exists:users,user_id',
        ]);

        $userId = $validated['participant_id'];

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // Sprawdź, czy użytkownik jest już zapisany
        if ($event->participants()->where('user_id', $userId)->exists()) {
            return response()->json(['message' => 'Jesteś już zapisany na to wydarzenie.'], 409);
        }

        // Sprawdź limit miejsc
        $currentParticipants = $event->participants()->count();
        if ($currentParticipants >= $event->participants_limit) {
            return response()->json(['message' => 'Brak wolnych miejsc na to wydarzenie.'], 400);
        }

        // Zapisz użytkownika
        $event->participants()->attach($userId, [
            'date_of_registration' => now()
        ]);

        return response()->json(['message' => 'Zostałeś pomyślnie zapisany na wydarzenie.'], 200);
    }

    /**
     * Wypisz użytkownika z wydarzenia.
     */
    public function unregister(Request $request, $eventId)
    {
        $validated = $request->validate([
            'participant_id' => 'required|exists:users,user_id',
        ]);

        $userId = $validated['participant_id'];

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // Sprawdź, czy użytkownik jest zapisany
        if (!$event->participants()->where('user_id', $userId)->exists()) {
            return response()->json(['message' => 'Nie jesteś zapisany na to wydarzenie.'], 400);
        }

        // Wypisz użytkownika
        $event->participants()->detach($userId);

        return response()->json(['message' => 'Zostałeś pomyślnie wyrejestrowany z wydarzenia.'], 200);
    }

    /**
     * Pobierz uczestników danego wydarzenia.
     */
    public function participants($eventId)
    {
        $event = Event::find($eventId);
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $participants = $event->participants()->get(['users.user_id', 'users.name', 'users.surname']);

        return response()->json($participants, 200);
    }

    /**
     * Pobierz wydarzenia, na które zapisany jest dany użytkownik.
     */
    public function userEvents($userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $events = $user->registeredEvents()
            ->with(['instructor:user_id,name,surname'])
            ->where('end_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->get();

        return response()->json($events, 200);
    }
}
