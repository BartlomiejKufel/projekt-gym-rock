<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'surname' => 'sometimes|required|string|max:255',
            'login' => 'sometimes|required|string|max:255|unique:users,login,' . $this->route('user') . ',user_id',
            'password' => 'sometimes|required|string|min:6',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $this->route('user') . ',user_id',
            'date_of_birth' => 'nullable|date',
            'profile_picture' => 'nullable|string',
            'role_id' => 'sometimes|required|exists:roles,role_id',
        ];
    }
}
