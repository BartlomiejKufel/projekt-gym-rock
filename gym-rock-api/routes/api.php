<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PurchaseHistoryController;
use App\Http\Controllers\EntranceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\QrCardController;
use App\Http\Controllers\EventParticipantController;


Route::apiResource('offers', OfferController::class);

Route::apiResource('roles', RoleController::class);

Route::apiResource('users', UserController::class);
Route::post('users/login', [UserController::class, 'login']);
Route::get('users/profile_picture/{userId}', [UserController::class, 'showProfilePicture']);

Route::apiResource('events', EventController::class);
Route::post('events/{eventId}/register', [EventParticipantController::class, 'register']);
Route::post('events/{eventId}/unregister', [EventParticipantController::class, 'unregister']);
Route::get('events/{eventId}/participants', [EventParticipantController::class, 'participants']);
Route::get('users/{userId}/registered-events', [EventParticipantController::class, 'userEvents']);

Route::apiResource('purchases', PurchaseHistoryController::class);
Route::get('purchases/{customerId}/active', [PurchaseHistoryController::class, 'showActiveOffers']);
Route::get('purchases/user/{userId}', [PurchaseHistoryController::class, 'getUserPurchases']);

Route::apiResource('entrances', EntranceController::class);
Route::get('entrances/user/{userId}/streak', [EntranceController::class, 'getStreakStats']);
Route::get('entrances/user/{userId}/weekly', [EntranceController::class, 'getWeeklyStats']);
Route::get('entrances/user/{userId}/monthly', [EntranceController::class, 'getMonthlyStats']);

Route::get('notifications/active', [NotificationController::class, 'active']);
Route::apiResource('notifications', NotificationController::class);

Route::apiResource('qrcards', QrCardController::class);
Route::get('qrcards/user/{userId}', [QrCardController::class, 'showByUserId']);
