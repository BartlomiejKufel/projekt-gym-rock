<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PurchaseHistory;
use Illuminate\Http\Request;

class PurchaseHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $history = PurchaseHistory::with(['customer', 'employee', 'offer'])->get();
        return response()->json($history, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:users,user_id',
            'employee_id' => 'required|exists:users,user_id',
            'price' => 'required|numeric',
            'purchase_date' => 'required|date',
            'offer_id' => 'required|exists:offers,offer_id',
        ]);
        
        $purchase = PurchaseHistory::create($validated);
        return response()->json($purchase, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $purchase = PurchaseHistory::with(['customer', 'employee', 'offer'])->find($id);
        if ($purchase) {
            return response()->json($purchase, 200);
        }
        return response()->json(['message' => 'Purchase not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $purchase = PurchaseHistory::find($id);
        if ($purchase) {
            $purchase->update($request->all());
            return response()->json($purchase, 200);
        }
        return response()->json(['message' => 'Purchase not found'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $purchase = PurchaseHistory::find($id);
        if ($purchase) {
            $purchase->delete();
            return response()->json(['message' => 'Purchase deleted'], 200);
        }
        return response()->json(['message' => 'Purchase not found'], 404);
    }
}
