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
        Schema::create("lesson_progress", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("user_id")
                ->constrained("users")
                ->onDelete("cascade");
            $table
                ->foreignId("lesson_id")
                ->constrained("lessons")
                ->onDelete("cascade");
            $table
                ->boolean("is_completed")
                ->default(true)
                ->comment("สถานะการเรียน");
            $table
                ->dateTime("completed_at")
                ->nullable()
                ->comment("วันที่เรียนจบ");
            $table->boolean("is_active")->default(true);
            $table->timestamps();
        });

        DB::statement(
            "COMMENT ON TABLE lesson_progress IS 'เก็บสถานะความคืบหน้าการเรียน'",
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("lesson_progress");
    }
};
