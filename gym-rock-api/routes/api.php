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
Route::apiResource('events', EventController::class);
Route::apiResource('purchases', PurchaseHistoryController::class);
Route::apiResource('entrances', EntranceController::class);
Route::apiResource('notifications', NotificationController::class);
Route::apiResource('qrcards', QrCardController::class);
