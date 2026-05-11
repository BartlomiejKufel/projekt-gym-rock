<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offer extends Model
{
    protected $table = 'offers';
    protected $primaryKey = 'offer_id';
    public $timestamps = false;

    protected $fillable = ['name', 'price', 'duration'];

    public function purchases(): HasMany
    {
        return $this->hasMany(PurchaseHistory::class, 'offer_id', 'offer_id');
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'offer_id', 'offer_id');
    }
}
