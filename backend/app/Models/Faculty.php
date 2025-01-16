<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Model, SoftDeletes, Factories\HasFactory};

class Faculty extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "faculties";

    protected $fillable = ["id", "campus", "name", "is_active"];

    protected $casts = [
        "is_active" => "boolean",
        "created_at" => "datetime",
        "updated_at" => "datetime",
        "deleted_at" => "datetime",
    ];

    public $timestamps = true;
}
