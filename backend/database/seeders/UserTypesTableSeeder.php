<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\UserType;

class UserTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ลบข้อมูลเก่าก่อน
        UserType::truncate();

        // สร้างข้อมูลตัวอย่าง
        UserType::insert([
            ["name" => "Admin", "created_at" => now(), "updated_at" => now()],
            [
                "name" => "Instructor",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            ["name" => "Student", "created_at" => now(), "updated_at" => now()],
        ]);
    }
}
