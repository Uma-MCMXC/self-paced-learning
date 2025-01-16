<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\AcademicPosition;

class AcademicPositionsTableSeeder extends Seeder
{
    public function run()
    {
        // ลบข้อมูลเก่าก่อน
        AcademicPosition::truncate();

        // สร้างข้อมูลตัวอย่าง
        AcademicPosition::insert([
            [
                "name" => "ผู้ช่วยศาสตราจารย์",
                "name_abbreviation" => "ผศ.",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "รองศาสตราจารย์",
                "name_abbreviation" => "รศ",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "ศาสตราจารย์",
                "name_abbreviation" => "ศ.",
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
