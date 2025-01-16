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
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('branch_id')->constrained('branches')->onDelete('set null');
            $table->foreignId('title_id')->nullable()->constrained('titles')->onDelete('set null');
            $table->foreignId('academic_position_id')->nullable()->constrained('academic_positions')->onDelete('set null');
            $table->boolean("lecturer")->default(true)->comment("อาจารย์");
            $table->boolean("doctoral_degree")->default(false)->comment("doctor");
            $table->string("first_name");
            $table->string("last_name");
            $table->string('email');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
