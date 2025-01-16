<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\{User, Staff, UserType, Branch, Title};

class UsersAndStaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ลบข้อมูลเก่าในตาราง users และ staff
        User::truncate();
        Staff::truncate();

        // ค้นหา user_type_id โดยอ้างอิงจากชื่อประเภทผู้ใช้
        $userTypeId = UserType::where("name", "Admin")->value("id");

        // ค้นหา branch_id โดยอ้างอิงจากชื่อสาขา
        $branchId = Branch::where(
            "name",
            "สาขาวิชาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ",
        )->value("id");

        // ค้นหา title_id โดยอ้างอิงจากชื่อคำนำหน้า
        $titleId = Title::where("name", "นางสาว")->value("id");

        // สร้างผู้ใช้ใหม่
        $user = User::create([
            "user_type_id" => $userTypeId, // อ้างอิงจากชื่อประเภทผู้ใช้
            "name" => "อุมา เพ็ชรคง",
            "email" => "petkong28@gmail.com",
            "password" => null,
            "google_token" => null,
            "is_active" => true,
            "created_at" => now(),
            "updated_at" => now(),
        ]);

        // สร้างข้อมูลในตาราง staff โดยอ้างอิง ID ที่ได้จากชื่อ
        Staff::create([
            "user_id" => $user->id,
            "branch_id" => $branchId,
            "title_id" => $titleId,
            "academic_position_id" => null,
            "lecturer" => false,
            "doctoral_degree" => false,
            "first_name" => "อุมา",
            "last_name" => "เพ็ชรคง",
            "email" => "petkong28@gmail.com",
            "is_active" => true,
            "created_at" => now(),
            "updated_at" => now(),
        ]);
    }
}
