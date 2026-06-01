<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PurchaseHistory;
use Illuminate\Http\Request;
use App\Http\Requests\StorePurchaseHistoryRequest;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PurchaseHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $history = PurchaseHistory::with(['customer', 'employee', 'offer'])->get();
        $history->each(function ($purchase) {
            $purchase->customer?->makeHidden('profile_picture');
            $purchase->employee?->makeHidden('profile_picture');
        });
        return response()->json($history, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePurchaseHistoryRequest $request)
    {
        $validated = $request->validated();
        
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
             $purchase->customer?->makeHidden('profile_picture');
             $purchase->employee?->makeHidden('profile_picture');
             return response()->json($purchase, 200);
        }
        return response()->json(['message' => 'Nie znaleziono zakupu'], 404);
    }

    public function showActiveOffers(string $customerId)
    {
        $purchases = PurchaseHistory::with('offer')
            ->where('customer_id', $customerId)
            ->get();

        $activePurchases = $purchases->filter(function ($purchase) {
            if (!$purchase->offer) return false;
            $validUntil = Carbon::parse($purchase->purchase_date)->addDays($purchase->offer->duration);
            return $validUntil->isFuture() || $validUntil->isToday();
        })->map(function ($purchase) {
            $validUntil = Carbon::parse($purchase->purchase_date)->addDays($purchase->offer->duration);
            $daysLeft = Carbon::now()->startOfDay()->diffInDays($validUntil->copy()->startOfDay(), false);
            
            return [
                'purchase_id' => $purchase->purchase_id,
                'purchase_date' => $purchase->purchase_date,
                'offer_name' => $purchase->offer->name,
                'valid_until' => $validUntil->toDateTimeString(),
                'days_left' => (int) $daysLeft
            ];
        })->values();

        return response()->json($activePurchases, 200);
    }

    public function getUserPurchases(string $userId)
    {
        $history = PurchaseHistory::with(['offer'])
            ->where('customer_id', $userId)
            ->orderBy('purchase_date', 'desc')
            ->get();

        return response()->json($history, 200);
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
        return response()->json(['message' => 'Nie znaleziono zakupu'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $purchase = PurchaseHistory::find($id);
        if ($purchase) {
            $purchase->delete();
            return response()->json(['message' => 'Zakup został usunięty'], 200);
        }
        return response()->json(['message' => 'Nie znaleziono zakupu'], 404);
    }
}
