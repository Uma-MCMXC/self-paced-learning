<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Title;

class TitlesTableSeeder extends Seeder
{
    public function run()
    {
        // ลบข้อมูลเก่าก่อน
        Title::truncate();

        // สร้างข้อมูลตัวอย่าง
        Title::insert([
            [
                "name" => "นาย",
                "name_abbreviation" => "นาย",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "นาง",
                "name_abbreviation" => "นาง",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                "name" => "นางสาว",
                "name_abbreviation" => "น.ส.",
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
