<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('academic_positions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('ศาสตราจารย์, รองศาสตราจารย์, ผู้ช่วยศาสตราจารย์');
            $table->string('name_abbreviation')->comment('ศ., รศ., ผศ.');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_positions');
    }
};
