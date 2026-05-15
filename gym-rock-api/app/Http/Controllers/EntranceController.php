<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Entrance;
use Illuminate\Http\Request;

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
}
