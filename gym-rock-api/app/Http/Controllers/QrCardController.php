<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QrCard;
use Illuminate\Http\Request;

class QrCardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cards = QrCard::with('user')->get();
        return response()->json($cards, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'qr_code' => 'required|string|max:255',
        ]);
        $card = QrCard::create($validated);
        return response()->json($card, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $card = QrCard::with('user')->find($id);
        if ($card) {
            return response()->json($card, 200);
        }
        return response()->json(['message' => 'Card not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $card = QrCard::find($id);
        if ($card) {
            $card->update($request->all());
            return response()->json($card, 200);
        }
        return response()->json(['message' => 'Card not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $card = QrCard::find($id);
        if ($card) {
            $card->delete();
            return response()->json(['message' => 'Card deleted'], 200);
        }
        return response()->json(['message' => 'Card not found'], 404);
    }
}
