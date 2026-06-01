<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreOfferRequest;
use App\Models\Offer;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offers = Offer::all();

        return response()->json($offers, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfferRequest $request)
    {
        $validated = $request->validated();
        
        $offer = Offer::create($validated);
        return response()->json($offer, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $offer = Offer::find($id);
        if ($offer) {
            return response()->json($offer, 200);
        }
        return response()->json(['message' => 'Nie znaleziono oferty'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $offer = Offer::find($id);
        if ($offer) {
            $offer->update($request->all());
            return response()->json($offer, 200);
        }
        return response()->json(['message' => 'Nie znaleziono oferty'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $offer = Offer::find($id);
        if ($offer) {
            $offer->delete();
            return response()->json(['message' => 'Oferta została usunięta'], 200);
        }
        return response()->json(['message' => 'Nie znaleziono oferty'], 404);
    }
}
