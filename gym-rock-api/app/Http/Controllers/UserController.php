<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->get()->makeHidden('profile_picture');
        return response()->json($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        
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
            $user->makeHidden('profile_picture');
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'Nie znaleziono użytkownika'], 404);
    }

    public function login(LoginUserRequest $request)
    {
        $validated = $request->validated();
        $user = User::where('login', $validated['login'])->first();
        
        if ($user && Hash::check($validated['password'], $user->password)) {
            $user->makeHidden('profile_picture');
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'Nie znaleziono użytkownika'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $user = User::find($id);
        if ($user) {
            $data = $request->validated();
            if (isset($data['password'])) {
                $data['password'] = bcrypt($data['password']);
            }
            $user->update($data);
            $user->makeHidden('profile_picture');
            return response()->json($user, 200);
        }
        return response()->json(['message' => 'Nie znaleziono użytkownika'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'Użytkownik został usunięty'], 200);
        }
        return response()->json(['message' => 'Nie znaleziono użytkownika'], 404);
    }

    /**
     * Display the profile picture for the specified user.
     */
    public function showProfilePicture(Request $request, string $userId)
    {
        $user = User::where('user_id', $userId)->first();

        if (!$user || !$user->profile_picture) {
            return response()->json(['message' => 'Nie znaleziono zdjęcia dla tego użytkownika'], 404);
        }

        $profile_picture = $user->profile_picture;
        if (is_resource($profile_picture)) {
            $profile_picture = stream_get_contents($profile_picture);
        }

        // If the client explicitly requests JSON (e.g., Accept: application/json or ?json=1)
        if ($request->wantsJson() || $request->query('json')) {
            if (is_string($profile_picture) && str_starts_with($profile_picture, 'data:image/')) {
                return response()->json(['profile_picture' => $profile_picture], 200);
            }
            if (is_string($profile_picture) && !str_starts_with($profile_picture, "\x89PNG") && base64_encode(base64_decode($profile_picture, true)) === $profile_picture) {
                return response()->json(['profile_picture' => 'data:image/png;base64,' . $profile_picture], 200);
            }
            return response()->json(['profile_picture' => 'data:image/png;base64,' . base64_encode($profile_picture)], 200);
        }

        // Default: return raw binary image (useful for <img src="..." />)
        if (is_string($profile_picture) && str_starts_with($profile_picture, 'data:image/')) {
            if (preg_match('/^data:image\/(\w+);base64,(.+)$/is', $profile_picture, $matches)) {
                $type = $matches[1];
                $data = base64_decode($matches[2]);
                return response($data)->header('Content-Type', 'image/' . $type);
            }
        }

        if (is_string($profile_picture) && !str_starts_with($profile_picture, "\x89PNG") && base64_encode(base64_decode($profile_picture, true)) === $profile_picture) {
            $decoded = base64_decode($profile_picture);
            if ($decoded !== false) {
                return response($decoded)->header('Content-Type', 'image/png');
            }
        }

        return response($profile_picture)->header('Content-Type', 'image/png');
    }
}
