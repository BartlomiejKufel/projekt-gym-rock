<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PurchaseHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function showActiveOffers(string $customerId)
    {
        $activePurchases = PurchaseHistory::query()
            ->select(
                'purchase_history.purchase_id as purchase_id',
                'purchase_history.purchase_date',
                'offers.name as offer_name',
                DB::raw('DATE_ADD(purchase_history.purchase_date, INTERVAL offers.duration DAY) as valid_until'),
                DB::raw('DATEDIFF(DATE_ADD(purchase_history.purchase_date, INTERVAL offers.duration DAY), NOW()) as days_left')
            )
            ->join('offers', 'purchase_history.offer_id', '=', 'offers.offer_id')
            ->where('purchase_history.customer_id', $customerId)
            ->whereRaw('DATE_ADD(purchase_history.purchase_date, INTERVAL offers.duration DAY) >= NOW()')
            ->get();

        if ($activePurchases->isNotEmpty()) {
            return response()->json($activePurchases, 200);
        }

        return response()->json(['message' => 'No active offers found'], 404);
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
