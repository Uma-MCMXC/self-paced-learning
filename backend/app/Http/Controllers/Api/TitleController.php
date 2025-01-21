<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Title;
use Illuminate\Http\Request;

class TitleController extends Controller
{
    public function index()
    {
        // ดึงข้อมูลทั้งหมดจาก titles
        return response()->json(Title::all());
    }
}
