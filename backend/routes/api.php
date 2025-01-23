<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{TitleController, BranchController};

Route::get("/titles", [TitleController::class, "index"]);
Route::get("/branches", [BranchController::class, "index"]);
