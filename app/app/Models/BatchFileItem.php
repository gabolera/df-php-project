<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatchFileItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'batch_file_id',
        'zip_code_from',
        'zip_code_to',
        'status',
    ];

    public function batchFile()
    {
        return $this->belongsTo(BatchFile::class);
    }
}
