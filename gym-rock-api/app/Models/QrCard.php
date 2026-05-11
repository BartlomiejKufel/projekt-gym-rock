<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QrCard extends Model
{
    protected $table = 'qr_cards';
    protected $primaryKey = 'card_id';
    public $timestamps = false;

    protected $fillable = ['user_id', 'qr_code', 'date_of_creation'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
