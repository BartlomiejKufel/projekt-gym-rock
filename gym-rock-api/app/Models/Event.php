<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Event extends Model
{
    protected $table = 'events';
    protected $primaryKey = 'event_id';
    public $timestamps = false;

    protected $fillable = ['instructor_id', 'name', 'description', 'participants_limit', 'offer_id', 'start_date', 'end_date'];

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'instructor_id', 'user_id');
    }

    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class, 'offer_id', 'offer_id');
    }

    // Relacja WIELE DO WIELU z użytkownikami przez event_participants
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'event_participants', 'event_id', 'participant_id')
                    ->withPivot('date_of_registration');
    }
}
