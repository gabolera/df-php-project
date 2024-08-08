<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZipCodeDistance extends Model
{
    use HasFactory;

    protected $fillable = [
        'from',
        'to',
        'distance',
        'coordinates',
    ];

    protected $casts = [
        'distance' => 'float',
        'coordinates' => 'array',
    ];

    public function scopeFindDistance(Builder $query, string $zipCodeFrom, string $zipCodeTo): Builder
    {
        return $query
            ->where(function ($query) use ($zipCodeFrom, $zipCodeTo) {
                $query->where('from', $zipCodeFrom)
                      ->where('to', $zipCodeTo);
            })
            ->orWhere(function ($query) use ($zipCodeFrom, $zipCodeTo) {
                $query->where('from', $zipCodeTo)
                      ->where('to', $zipCodeFrom);
            });
    }
}
