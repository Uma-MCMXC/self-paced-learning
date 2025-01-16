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
        Schema::create("test_results", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("user_id")
                ->constrained("users")
                ->onDelete("cascade");
            $table
                ->foreignId("test_id")
                ->constrained("tests")
                ->onDelete("cascade");
            $table->float("score")->comment("คะแนนที่ได้");
            $table
                ->foreignId("recommended_lesson_id")
                ->constrained("lessons")
                ->onDelete("cascade");
            $table->boolean("is_active")->default(true);
            $table->timestamps();
        });

        DB::statement("COMMENT ON TABLE test_results IS 'เก็บผลการทดสอบ'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("test_results");
    }
};
