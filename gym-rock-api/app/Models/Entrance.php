<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Entrance extends Model
{
    protected $table = 'entrances';
    protected $primaryKey = 'entrance_id';
    public $timestamps = false;

    protected $fillable = ['user_id', 'date_of_entry', 'start_time', 'end_time', 'time_spent'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
