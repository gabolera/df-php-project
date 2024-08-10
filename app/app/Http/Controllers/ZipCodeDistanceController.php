<?php

namespace App\Http\Controllers;

use App\Models\ZipCodeDistance;
use App\Services\CalculateDistanceByCoordinates;
use App\Services\ZipCodeService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ZipCodeDistanceController extends Controller
{
    public function index(Request $request)
    {
        $distance = ZipCodeDistance::all();
        return response()->json($distance);
    }

    public function show($ceps)
    {
        $ceps = explode('-', $ceps);

        $distance = ZipCodeDistance::findDistance($ceps[0], $ceps[1])
            ->with('fromZipCode', 'toZipCode')
            ->first();

        if (!$distance) {
            return redirect('/');
        }

        return Inertia::render('ZipCode/Show', [
            'distances' => $distance,
        ]);
    }

    public function store(Request $request)
    {
        $zipCodeFrom = preg_replace('/\D/', '', $request->input('from'));
        $zipCodeTo = preg_replace('/\D/', '', $request->input('to'));

        if (strlen($zipCodeFrom) !== 8 || strlen($zipCodeTo) !== 8) {
            throw ValidationException::withMessages(['CEP inválido']);
        }

        if ($zipCodeFrom === $zipCodeTo) {
            throw ValidationException::withMessages(['CEP de origem e destino não podem ser iguais']);
        }

        // Verificar se já não existe essa distância no banco
        $exists = ZipCodeDistance::findDistance($zipCodeFrom, $zipCodeTo)
            ->first();

        if ($exists) {
            return redirect()->route('zipcode.show', ['ceps' => $zipCodeFrom . '-' . $zipCodeTo]);
        }

        $zipCodeService = new ZipCodeService();
        $zipCodeFrom = $zipCodeService->findOrCreateZipCode($zipCodeFrom);
        $zipCodeTo = $zipCodeService->findOrCreateZipCode($zipCodeTo);

        if (empty($zipCodeFrom['coordinates']) || empty($zipCodeTo['coordinates'])) {
            $cepNo = empty($zipCodeFrom['coordinates']) ? $zipCodeFrom['cep'] : $zipCodeTo['cep'];
            $cepNo .= !empty($cepNo) && empty($zipCodeTo['cep']) ? ' e ' . $zipCodeTo['cep'] : '';
            throw ValidationException::withMessages([
                'Coordenadas geográficas não encontras para estes CEPs ' . $cepNo ?? ''
            ]);
        }

        $distance = CalculateDistanceByCoordinates::calculate(
            $zipCodeFrom['coordinates'],
            $zipCodeTo['coordinates'],
        );

        $zipCodeDistance = new ZipCodeDistance();
        $zipCodeDistance->from_id = $zipCodeFrom->id;
        $zipCodeDistance->to_id = $zipCodeTo->id;
        $zipCodeDistance->distance = $distance;
        $zipCodeDistance->save();

        return redirect()->route('zipcode.show', ['ceps' => $zipCodeFrom->cep . '-' . $zipCodeTo->cep]);
    }

    public function list()
    {
        $zipCodeDistance = ZipCodeDistance::with('fromZipCode', 'toZipCode')->get();

        return Inertia::render('ZipCode/List', [
            'zipCodeDistances' => $zipCodeDistance,
        ]);
    }
}
