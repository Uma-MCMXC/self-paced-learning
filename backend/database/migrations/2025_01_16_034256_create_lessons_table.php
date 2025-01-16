<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("lessons", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("course_id")
                ->constrained("courses")
                ->onDelete("cascade");
            $table->text("name");
            $table->text("content")->nullable();
            $table
                ->enum("content_type", ["video", "pdf", "text", "other"])
                ->default("text")
                ->comment("ประเภทของเนื้อหา เช่น video, pdf, text หรือ other");
            $table->integer("duration")->comment("ระยะเวลาที่ใช้เรียน");
            $table
                ->boolean("is_free")
                ->default(true)
                ->comment("บทเรียนนี้ฟรีหรือไม่");
            $table
                ->integer("lesson_order")
                ->comment("ลำดับของบทเรียนในหลักสูตร");
            $table->boolean("is_active")->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        DB::statement("COMMENT ON TABLE lessons IS 'ข้อมูลบทเรียน'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("lessons");
    }
};
