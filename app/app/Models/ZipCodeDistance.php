<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZipCodeDistance extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_id',
        'to_id',
        'distance',
    ];

    protected $casts = [
        'distance' => 'float',
    ];

    public function fromZipCode()
    {
        return $this->belongsTo(ZipCode::class, 'from_id', 'cep');
    }

    public function toZipCode()
    {
        return $this->belongsTo(ZipCode::class, 'to_id', 'cep');
    }

    public function scopeFindDistance(Builder $query, string $zipCodeFrom, string $zipCodeTo): Builder
    {
        return $query
            ->join('zip_codes as zcf', 'zcf.cep', '=', 'zip_code_distances.from_id')
            ->join('zip_codes as zct', 'zct.cep', '=', 'zip_code_distances.to_id')
            ->where(function ($query) use ($zipCodeFrom, $zipCodeTo) {
                $query->where('zcf.cep', $zipCodeFrom)
                      ->where('zct.cep', $zipCodeTo);
            })
            ->orWhere(function ($query) use ($zipCodeFrom, $zipCodeTo) {
                $query->where('zcf.cep', $zipCodeTo)
                      ->where('zct.cep', $zipCodeFrom);
            });
    }
}
