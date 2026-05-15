<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
        ]);
        
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
        return response()->json(['message' => 'Offer not found'], 404);
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
        return response()->json(['message' => 'Offer not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $offer = Offer::find($id);
        if ($offer) {
            $offer->delete();
            return response()->json(['message' => 'Offer deleted'], 200);
        }
        return response()->json(['message' => 'Offer not found'], 404);
    }
}
