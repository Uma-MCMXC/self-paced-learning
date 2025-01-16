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
        Schema::create("navigation_rules", function (Blueprint $table) {
            $table->id();
            $table->float("min_score")->comment("คะแนนขั้นต่ำ");
            $table->float("max_score")->comment("คะแนนสูงสุด");
            $table
                ->foreignId("recommended_lesson_id")
                ->constrained("lessons")
                ->onDelete("cascade");
            $table->timestamps();
        });

        DB::statement(
            "COMMENT ON TABLE navigation_rules IS 'เก็บกฎการนำทางตามคะแนน'",
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("navigation_rules");
    }
};
