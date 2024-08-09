<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ZipCodeDistance extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'from_id',
        'to_id',
        'distance',
    ];

    protected $casts = [
        'distance' => 'float'
    ];

    public function fromZipCode()
    {
        return $this->belongsTo(ZipCode::class, 'from_id', 'id');
    }

    public function toZipCode()
    {
        return $this->belongsTo(ZipCode::class, 'to_id', 'id');
    }

    public function scopeFindDistance(Builder $query, string $zipCodeFrom, string $zipCodeTo): Builder
    {
        return $query
            ->join('zip_codes as zcf', 'zcf.id', '=', 'zip_code_distance.from_id')
            ->join('zip_codes as zct', 'zct.id', '=', 'zip_code_distance.to_id')
            ->where(function ($query) use ($zipCodeFrom, $zipCodeTo) {
                $query->where('zcf.cep', '=', $zipCodeFrom)
                    ->where('zct.cep', '=', $zipCodeTo);
            })
            ->orWhere(function ($query) use ($zipCodeFrom, $zipCodeTo) {
                $query->where('zcf.cep', '=', $zipCodeTo)
                    ->where('zct.cep', '=', $zipCodeFrom);
            });
    }
}
