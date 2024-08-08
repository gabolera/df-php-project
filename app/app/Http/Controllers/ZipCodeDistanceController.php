<?php

namespace App\Http\Controllers;

use App\Models\ZipCodeDistance;
use App\Services\BrasilApi;
use App\Services\CalculateDistanceByCoordinates;
use Illuminate\Http\Request;
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
        $zipCodeFrom = $request->input('from');
        $zipCodeTo = $request->input('to');

        $zipCodeFrom = preg_replace('/\D/', '', $zipCodeFrom);
        $zipCodeTo = preg_replace('/\D/', '', $zipCodeTo);

        // Verificar se já não existe essa distância no banco
        $exists = ZipCodeDistance::findDistance($zipCodeFrom, $zipCodeTo)
            ->first();

        if ($exists) {
            return redirect()->route('zipcode.show', ['ceps' => $zipCodeFrom . '-' . $zipCodeTo]);
        }

        // O From sempre será menor que o To para salvar no banco
        if ($zipCodeFrom > $zipCodeTo) {
            $temp = $zipCodeFrom;
            $zipCodeFrom = $zipCodeTo;
            $zipCodeTo = $temp;
        }

        $coordinatesZipCodeFrom = BrasilApi::getCep($zipCodeFrom);
        $coordinatesZipCodeTo = BrasilApi::getCep($zipCodeTo);

        if (empty($coordinatesZipCodeFrom['location']['coordinates']) || empty($coordinatesZipCodeTo['location']['coordinates'])) {
            return response()->json(['message' => 'Coordenadas não encontras para realizar o cálculo de distância'], 404);
        }

        $coordinates = [
            [
                $zipCodeFrom => [
                    'latitude' => $coordinatesZipCodeFrom['location']['coordinates']['latitude'],
                    'longitude' => $coordinatesZipCodeFrom['location']['coordinates']['longitude'],
                ]
            ],
            [
                $zipCodeTo => [
                    'latitude' => $coordinatesZipCodeTo['location']['coordinates']['latitude'],
                    'longitude' => $coordinatesZipCodeTo['location']['coordinates']['longitude'],
                ]
            ]
        ];

        $distance = CalculateDistanceByCoordinates::calculate(
            $coordinates[0][$zipCodeFrom],
            $coordinates[1][$zipCodeTo]
        );

        $zipCodeDistance = new ZipCodeDistance();
        $zipCodeDistance->from = str_pad($zipCodeFrom, 8, '0', STR_PAD_LEFT);
        $zipCodeDistance->to = str_pad($zipCodeTo, 8, '0', STR_PAD_LEFT);
        $zipCodeDistance->distance = $distance ?? 0;
        $zipCodeDistance->coordinates = $coordinates;
        $zipCodeDistance->save();

        return response()->json($zipCodeDistance);
    }
}
