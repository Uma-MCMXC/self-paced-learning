<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Model, Factories\HasFactory};

class AcademicPosition extends Model
{
    use HasFactory;

    protected $table = "academic_positions";

    protected $fillable = ["id", "name", "name_abbreviation"];

    protected $casts = [
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    public $timestamps = true;

    public function staff()
    {
        return $this->hasMany(Staff::class, "academic_position_id");
    }
}
