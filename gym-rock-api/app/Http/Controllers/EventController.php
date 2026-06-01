<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Requests\StoreEventRequest;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    
    public function index(Request $request)
    {
        $query = Event::with(['instructor:user_id,name,surname']);

        if ($request->filled('date')) {
            $query->whereDate('start_date', $request->query('date'));
        }

        $events = $query->orderBy('start_date', 'asc')->get();

        return response()->json($events, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $validated = $request->validated();
        
        $event = Event::create($validated);
        return response()->json($event, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::with(['instructor', 'offer', 'participants'])->find($id);
        if ($event) {
            $event->instructor?->makeHidden('profile_picture');
            $event->participants?->makeHidden('profile_picture');
            return response()->json($event, 200);
        }
        return response()->json(['message' => 'Nie znaleziono wydarzenia'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $event = Event::find($id);
        if ($event) {
            $event->update($request->all());
            return response()->json($event, 200);
        }
        return response()->json(['message' => 'Nie znaleziono wydarzenia'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::find($id);
        if ($event) {
            $event->delete();
            return response()->json(['message' => 'Wydarzenie zostało usunięte'], 200);
        }
        return response()->json(['message' => 'Nie znaleziono wydarzenia'], 404);
    }
}
