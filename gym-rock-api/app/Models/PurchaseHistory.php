<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseHistory extends Model
{
    protected $table = 'purchase_history';
    protected $primaryKey = 'purchase_id';
    public $timestamps = false;
    protected $fillable = ['customer_id', 'employee_id', 'price', 'purchase_date', 'offer_id'];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id', 'user_id');
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'employee_id', 'user_id');
    }

    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class, 'offer_id', 'offer_id');
    }
}
