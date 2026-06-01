<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $instructorId = $this->input('instructor_id');
        if (!$instructorId) return false;
        
        $user = \App\Models\User::with('role')->find($instructorId);
        return $user && $user->role && $user->role->name === 'instruktor';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'instructor_id' => 'required|exists:users,user_id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_color' => 'required|string|max:7',
            'participants_limit' => 'required|integer',
            'offer_id' => 'required|exists:offers,offer_id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ];
    }
}
