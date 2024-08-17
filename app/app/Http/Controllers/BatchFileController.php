<?php

namespace App\Http\Controllers;

use App\Enums\BatchFileStatusEnum;
use App\Helpers\SanitizeData;
use App\Models\BatchFile;
use App\Models\BatchFileItem;
use App\Services\RabbitMQ;
use App\Services\ZipCodeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BatchFileController extends Controller
{
    public function create()
    {
        return Inertia::render('BatchFile/Index');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt',
        ]);
        $amqp = new RabbitMQ();
        $errors = [];
        $file = $request->file('file');
        $csv = file($file->getRealPath());

        $batchId = BatchFile::create([
            'user_id' => Auth::id(),
            'status' => BatchFileStatusEnum::Pending->value,
        ]);

        foreach ($csv as $line => $row) {
            if ($line === 0) {
                continue;
            }

            $data = preg_split('/(,|;)/', $row);

            if (ZipCodeService::isValidZipCode($data[0]) === false) {
                $errors[] = "CEP de origem inválido: {$data[0]}";
                continue;
            }

            if (ZipCodeService::isValidZipCode($data[1]) === false) {
                $errors[] = "CEP de destino inválido: {$data[1]}";
                continue;
            }

            if ($data[0] === $data[1]) {
                $errors[] = "CEP de origem e destino não podem ser iguais: {$data[0]}";
                continue;
            }

            $data[0] = ZipCodeService::formatZipCode($data[0]);
            $data[1] = ZipCodeService::formatZipCode($data[1]);

            BatchFileItem::create([
                'batch_file_id' => $batchId->id,
                'zip_code_from' => $data[0],
                'zip_code_to' => $data[1],
                'status' => BatchFileStatusEnum::Pending->value,
            ]);

            $amqp->publish(json_encode([
                'batch_file_id' => $batchId->id,
                'zip_code_from' => $data[0],
                'zip_code_to' => $data[1],
            ]), 'batch_file');

        }

        return redirect()->route('batch.show', ['id' => $batchId]);
    }

    public function list()
    {
        $batches = BatchFile::where('user_id', Auth::id())
            ->with('items')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('BatchFile/List', [
            'batches' => $batches,
        ]);
    }

    public function show($id)
    {
        $batch = BatchFile::where('user_id', Auth::id())
            ->with('items')
            ->with('items.zipCodeDistance')
            ->find($id);

        $sanitizedBatch = SanitizeData::sanitize($batch->toArray());

        return Inertia::render('BatchFile/Show', [
            'batch' => $sanitizedBatch,
        ]);
    }
}
