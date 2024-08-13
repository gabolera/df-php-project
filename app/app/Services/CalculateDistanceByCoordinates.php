<?php

namespace App\Services;

/**
 * Utilizado o método de Haversine para calcular a distância entre dois pontos
 * Conta pesquisada na internet https://pt.wikipedia.org/wiki/F%C3%B3rmula_de_haversine
 */

class CalculateDistanceByCoordinates
{
    public static function calculate(array $coords1, array $coords2): float
    {
        $latFrom = deg2rad($coords1['latitude']);
        $lonFrom = deg2rad($coords1['longitude']);
        $latTo = deg2rad($coords2['latitude']);
        $lonTo = deg2rad($coords2['longitude']);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $a = sin($latDelta / 2) * sin($latDelta / 2) + cos($latFrom) * cos($latTo) * sin($lonDelta / 2) * sin($lonDelta / 2);
        $c = 2 * asin(sqrt($a));
        $distance = 6371 * $c;

        return $distance;
    }
}
