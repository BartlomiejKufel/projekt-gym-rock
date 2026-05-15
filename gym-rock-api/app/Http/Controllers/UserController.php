<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->get();
        return response()->json($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'login' => 'required|string|max:255|unique:users,login',
            'password' => 'required|string|min:6',
            'email' => 'required|string|email|max:255|unique:users,email',
            'date_of_birth' => 'nullable|date',
            'profile_picture' => 'nullable|string',
            'role_id' => 'required|exists:roles,role_id',
        ]);
        
        // Hash password before saving
        $validated['password'] = bcrypt($validated['password']);
        
        $user = User::create($validated);
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with('role')->find($id);
        if ($user) {
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    public function login(Request $request)
    {
        $user = User::where('login', $request->login)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if ($user) {
            $data = $request->all();
            if (isset($data['password'])) {
                $data['password'] = bcrypt($data['password']);
            }
            $user->update($data);
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'User not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted'], 200);
        }
        return response()->json(['message' => 'User not found'], 404);
    }
}
