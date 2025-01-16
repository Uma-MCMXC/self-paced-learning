<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Model, Factories\HasFactory};

class Title extends Model
{
    use HasFactory;

    protected $table = "titles";

    protected $fillable = ["id", "name", "name_abbreviation"];

    protected $casts = [
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    public $timestamps = true;

    public function staff()
    {
        return $this->hasMany(Staff::class, "title_id");
    }

    public function student()
    {
        return $this->hasMany(Staff::class, "title_id");
    }
}
