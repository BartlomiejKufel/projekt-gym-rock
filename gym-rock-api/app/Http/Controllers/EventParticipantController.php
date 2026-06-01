<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreEventParticipantRequest;

class EventParticipantController extends Controller
{
    /**
     * Zapisz użytkownika na wydarzenie.
     */
    public function register(StoreEventParticipantRequest $request, $eventId)
    {
        $validated = $request->validated();

        $userId = $validated['participant_id'];

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json(['message' => 'Nie znaleziono wydarzenia'], 404);
        }

        // Sprawdź, czy użytkownik jest już zapisany
        if ($event->participants()->where('user_id', $userId)->exists()) {
            return response()->json(['message' => 'Jesteś już zapisany na to wydarzenie.'], 409);
        }

        // Sprawdź limit miejsc
        $currentParticipants = $event->participants()->count();
        if ($currentParticipants >= $event->participants_limit) {
            return response()->json(['message' => 'Brak wolnych miejsc na to wydarzenie.'], 400);
        }

        // Zapisz użytkownika
        $event->participants()->attach($userId, [
            'date_of_registration' => now()
        ]);

        // Zapisz historię zakupu
        if ($event->offer) {
            \App\Models\PurchaseHistory::create([
                'customer_id' => $userId,
                'price' => $event->offer->price,
                'purchase_date' => now(),
                'offer_id' => $event->offer_id,
            ]);
        }

        return response()->json(['message' => 'Zostałeś pomyślnie zapisany na wydarzenie.'], 200);
    }

    /**
     * Wypisz użytkownika z wydarzenia.
     */
    public function unregister(StoreEventParticipantRequest $request, $eventId)
    {
        $validated = $request->validated();

        $userId = $validated['participant_id'];

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json(['message' => 'Nie znaleziono wydarzenia'], 404);
        }

        // Sprawdź, czy użytkownik jest zapisany
        if (!$event->participants()->where('user_id', $userId)->exists()) {
            return response()->json(['message' => 'Nie jesteś zapisany na to wydarzenie.'], 400);
        }

        // Wypisz użytkownika
        $event->participants()->detach($userId);

        return response()->json(['message' => 'Zostałeś pomyślnie wyrejestrowany z wydarzenia.'], 200);
    }

    /**
     * Pobierz uczestników danego wydarzenia.
     */
    public function participants($eventId)
    {
        $event = Event::find($eventId);
        if (!$event) {
            return response()->json(['message' => 'Nie znaleziono wydarzenia'], 404);
        }

        $participants = $event->participants()->get(['users.user_id', 'users.name', 'users.surname']);

        return response()->json($participants, 200);
    }

    /**
     * Pobierz wydarzenia, na które zapisany jest dany użytkownik.
     */
    public function userEvents($userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'Nie znaleziono użytkownika'], 404);
        }

        $events = $user->registeredEvents()
            ->with(['instructor:user_id,name,surname'])
            ->where('end_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->get();

        return response()->json($events, 200);
    }
}
