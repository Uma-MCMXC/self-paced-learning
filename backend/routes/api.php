<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TitleController;

// กำหนด API Routes ที่นี่
Route::get("/titles", [TitleController::class, "index"]);
