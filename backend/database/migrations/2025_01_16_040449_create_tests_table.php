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
        Schema::create("tests", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("course_id")
                ->constrained("courses")
                ->onDelete("cascade");
            $table->text("name");
            $table->float("total_score")->comment("คะแนนรวม (จำนวนทศนิยม)");
            $table
                ->enum("test_type", ["pre", "post"])
                ->comment("ประเภทแบบทดสอบ (pre, post)");
            $table->float("max_score")->comment("คะแนนเต็ม");
            $table->boolean("is_active")->default(true);
            $table->timestamps();
        });

        DB::statement("COMMENT ON TABLE tests IS 'ข้อมูลแบบทดสอบ'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("tests");
    }
};
