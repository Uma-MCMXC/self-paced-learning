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
        Schema::create("courses", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->text("description")->nullable();
            $table->integer("duration")->comment("ระยะเวลาที่ใช้เรียน");
            $table
                ->decimal("price", 10, 2)
                ->nullable()
                ->comment("ค่าใช้จ่ายหลักสูตร (ถ้ามี)");
            $table->boolean("is_active")->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        DB::statement("COMMENT ON TABLE courses IS 'ข้อมูลหลักสูตร'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("courses");
    }
};
