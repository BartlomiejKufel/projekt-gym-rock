<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Role::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $role = Role::create($validated);
        return response()->json($role, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::find($id);
        if ($role) {
            return response()->json($role, 200);
        }
        return response()->json(['message' => 'Role not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = Role::find($id);
        if ($role) {
            $role->update($request->all());
            return response()->json($role, 200);
        }
        return response()->json(['message' => 'Role not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);
        if ($role) {
            $role->delete();
            return response()->json(['message' => 'Role deleted'], 200);
        }
        return response()->json(['message' => 'Role not found'], 404);
    }
}
