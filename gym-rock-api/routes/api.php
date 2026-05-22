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

Route::apiResource('offers', OfferController::class);

Route::apiResource('roles', RoleController::class);

Route::apiResource('users', UserController::class);
Route::post('users/login', [UserController::class, 'login']);
Route::get('users/profile_picture/{userId}', [UserController::class, 'showProfilePicture']);

Route::apiResource('events', EventController::class);

Route::apiResource('purchases', PurchaseHistoryController::class);
Route::get('purchases/{customerId}/active', [PurchaseHistoryController::class, 'showActiveOffers']);

Route::apiResource('entrances', EntranceController::class);
Route::get('entrances/user/{userId}/streak', [EntranceController::class, 'getStreakStats']);
Route::get('entrances/user/{userId}/weekly', [EntranceController::class, 'getWeeklyStats']);
Route::get('entrances/user/{userId}/monthly', [EntranceController::class, 'getMonthlyStats']);

Route::apiResource('notifications', NotificationController::class);

Route::apiResource('qrcards', QrCardController::class);
Route::get('qrcards/user/{userId}', [QrCardController::class, 'showByUserId']);
