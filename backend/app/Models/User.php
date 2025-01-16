<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\{SoftDeletes, Factories\HasFactory};

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = "users";
    protected $fillable = [
        "id",
        "user_type_id",
        "name",
        "email",
        "email_verified_at",
        "password",
        "google_token",
        "is_active",
        "remember_token",
        "created_at",
        "updated_at",
    ];

    protected $hidden = ["password", "remember_token"];

    protected $casts = [
        "is_active" => "boolean",
        "email_verified_at" => "datetime",
        "created_at" => "datetime",
        "updated_at" => "datetime",
        "deleted_at" => "datetime",
    ];

    public $timestamps = true;

    public function userType()
    {
        return $this->belongsTo(UserType::class, "user_type_id");
    }

    public function staff()
    {
        return $this->hasOne(Staff::class, "user_id");
    }

    public function student()
    {
        return $this->hasOne(Student::class, "user_id");
    }
}
