<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Model, SoftDeletes, Factories\HasFactory};

class Branch extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "branches";

    protected $fillable = ["id", "faculty_id", "name", "is_active"];

    protected $casts = [
        "is_active" => "boolean",
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    public $timestamps = true;

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, "faculty_id");
    }
}
