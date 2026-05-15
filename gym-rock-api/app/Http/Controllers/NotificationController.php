<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::with('creator')->get();
        return response()->json($notifications, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'creator_id' => 'required|exists:users,user_id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);
        
        $notification = Notification::create($validated);
        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $notification = Notification::with('creator')->find($id);
        if ($notification) {
            return response()->json($notification, 200);
        }
        return response()->json(['message' => 'Notification not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            $notification->update($request->all());
            return response()->json($notification, 200);
        }
        return response()->json(['message' => 'Notification not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $notification = Notification::find($id);
        if ($notification) {
            $notification->delete();
            return response()->json(['message' => 'Notification deleted'], 200);
        }
        return response()->json(['message' => 'Notification not found'], 404);
    }
}
