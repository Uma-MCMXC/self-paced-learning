<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\{Faculty, Branch};

class FacultiesAndBranchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ลบข้อมูลเก่าก่อน
        Faculty::truncate();
        Branch::truncate();

        // สร้างข้อมูลคณะ
        $faculties = [
            [
                "campus" => "วิทยาเขตพัทลุง",
                "name" => "คณะวิทยาศาสตร์และนวัตกรรมดิจิทัล",
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ];

        Faculty::insert($faculties);

        // ค้นหา ID ของคณะจากชื่อ
        $facultyId = Faculty::where(
            "name",
            "คณะวิทยาศาสตร์และนวัตกรรมดิจิทัล",
        )->value("id");

        // สร้างข้อมูลสาขาวิชา
        $branches = [
            [
                "faculty_id" => $facultyId,
                "name" => "สาขาวิชาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ",
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ];

        Branch::insert($branches);
    }
}
