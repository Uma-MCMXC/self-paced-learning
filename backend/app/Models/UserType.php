<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Model, Factories\HasFactory};

class UserType extends Model
{
    use HasFactory;

    protected $table = "user_types";

    protected $fillable = ["id", "name"];

    protected $casts = [
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    public $timestamps = true;

    public function users()
    {
        return $this->hasMany(User::class, "user_type_id");
    }
}
