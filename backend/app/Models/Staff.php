<?php

namespace App\Models;

use Illuminate\Database\Eloquent\{Model, SoftDeletes, Factories\HasFactory};

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "staff";

    protected $fillable = [
        "id",
        "user_id",
        "branch_id",
        "title_id",
        "academic_position_id",
        "lecturer",
        "doctoral_degree",
        "first_name_th",
        "last_name_th",
        "email",
        "is_active",
        "created_at",
        "updated_at",
    ];

    protected $casts = [
        "lecturer" => "boolean",
        "doctoral_degree" => "boolean",
        "is_active" => "boolean",
        "created_at" => "datetime",
        "updated_at" => "datetime",
        "deleted_at" => "datetime",
    ];

    public $timestamps = true;

    public function getStaffFullNameThAttribute()
    {
        return "{$this->first_name_th} {$this->last_name_th}";
    }

    public function getStaffPrefixedFullNameThAttribute()
    {
        if (
            $this->academic_position_id === null &&
            $this->lecturer &&
            $this->doctoral_degree
        ) {
            return "{$this->lecturer} {$this->doctoral_degree} {$this->staff_full_name_th}";
        } elseif (
            $this->academic_position_id !== null &&
            $this->doctoral_degree
        ) {
            return "{$this->academicPosition->name_th} {$this->doctoral_degree} {$this->staff_full_name_th}";
        } elseif (
            $this->academic_position_id !== null &&
            $this->doctoral_degree === false
        ) {
            return "{$this->academicPosition->name_th} {$this->staff_full_name_th}";
        } elseif ($this->doctoral_degree === false && $this->lecturer) {
            return "{$this->lecturer} {$this->staff_full_name_th}";
        } elseif ($this->title_id) {
            return "{$this->title->name_th} {$this->staff_full_name_th}";
        } else {
            return $this->staff_full_name_th;
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, "branch_id");
    }

    public function title()
    {
        return $this->belongsTo(Title::class, "title_id");
    }

    public function academicPosition()
    {
        return $this->belongsTo(
            AcademicPosition::class,
            "academic_position_id",
        );
    }
}
