<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    protected $table = 'notifications';
    protected $primaryKey = 'notification_id';
    public $timestamps = false;

    protected $fillable = ['creator_id', 'name', 'description', 'start_date', 'end_date'];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id', 'user_id');
    }
}
