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
        Schema::create("test_questions", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("test_id")
                ->constrained("tests")
                ->onDelete("cascade");
            $table->text("question")->comment("คำถาม");
            $table
                ->enum("question_type", [
                    "multiple_choice",
                    "fill_in_the_blank",
                ])
                ->comment("ประเภทคำถาม");
            $table->json("answer_options")->comment("ตัวเลือกคำตอบ");
            $table->text("correct_answer")->comment("คำตอบที่ถูกต้อง");
            $table->boolean("is_active")->default(true);
            $table->timestamps();
        });

        DB::statement(
            "COMMENT ON TABLE test_questions IS 'เก็บคำถามในแบบทดสอบ'",
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("test_questions");
    }
};
