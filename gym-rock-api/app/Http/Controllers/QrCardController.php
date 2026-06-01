<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QrCard;
use Illuminate\Http\Request;
use App\Http\Requests\StoreQrCardRequest;

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
    public function store(StoreQrCardRequest $request)
    {
        $validated = $request->validated();
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
        return response()->json(['message' => 'Nie znaleziono karty'], 404);
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
        return response()->json(['message' => 'Nie znaleziono karty'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $card = QrCard::find($id);
        if ($card) {
            $card->delete();
            return response()->json(['message' => 'Karta została usunięta'], 200);
        }
        return response()->json(['message' => 'Nie znaleziono karty'], 404);
    }

    /**
     * Display the QR Code image for the specified user.
     */
    public function showByUserId(Request $request, string $userId)
    {
        $card = QrCard::where('user_id', $userId)->first();

        if (!$card || !$card->qr_code) {
            return response()->json(['message' => 'Nie znaleziono kodu QR dla tego użytkownika'], 404);
        }

        $qrCode = $card->qr_code;
        if (is_resource($qrCode)) {
            $qrCode = stream_get_contents($qrCode);
        }

        // If the client explicitly requests JSON (e.g., Accept: application/json or ?json=1)
        if ($request->wantsJson() || $request->query('json')) {
            if (is_string($qrCode) && str_starts_with($qrCode, 'data:image/')) {
                return response()->json(['qr_code' => $qrCode], 200);
            }
            if (is_string($qrCode) && !str_starts_with($qrCode, "\x89PNG") && base64_encode(base64_decode($qrCode, true)) === $qrCode) {
                return response()->json(['qr_code' => 'data:image/png;base64,' . $qrCode], 200);
            }
            return response()->json(['qr_code' => 'data:image/png;base64,' . base64_encode($qrCode)], 200);
        }

        // Default: return raw binary image (useful for <img src="..." />)
        if (is_string($qrCode) && str_starts_with($qrCode, 'data:image/')) {
            if (preg_match('/^data:image\/(\w+);base64,(.+)$/is', $qrCode, $matches)) {
                $type = $matches[1];
                $data = base64_decode($matches[2]);
                return response($data)->header('Content-Type', 'image/' . $type);
            }
        }

        if (is_string($qrCode) && !str_starts_with($qrCode, "\x89PNG") && base64_encode(base64_decode($qrCode, true)) === $qrCode) {
            $decoded = base64_decode($qrCode);
            if ($decoded !== false) {
                return response($decoded)->header('Content-Type', 'image/png');
            }
        }

        return response($qrCode)->header('Content-Type', 'image/png');
    }
}
