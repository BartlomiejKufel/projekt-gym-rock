<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with(['instructor', 'offer'])->get();
        return response()->json($events, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'instructor_id' => 'required|exists:users,user_id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_color' => 'required|string|max:7',
            'participants_limit' => 'required|integer',
            'offer_id' => 'required|exists:offers,offer_id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);
        
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
            return response()->json($event, 200);
        }
        return response()->json(['message' => 'Event not found'], 404);
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
        return response()->json(['message' => 'Event not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::find($id);
        if ($event) {
            $event->delete();
            return response()->json(['message' => 'Event deleted'], 200);
        }
        return response()->json(['message' => 'Event not found'], 404);
    }
}
