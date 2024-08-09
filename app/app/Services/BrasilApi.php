<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class BrasilApi
{
    private const BASE_URL = 'https://brasilapi.com.br/api/cep/v2/';
    public static function getCep(string $cep): array
    {
        $res = Http::get(self::BASE_URL . $cep);
        if ($res->clientError()) {
            throw ValidationException::withMessages(['CEP ' . $cep . ' inválido']);
        }

        $res = $res->json();

        if (empty($res['cep'])) {
            throw ValidationException::withMessages(['CEP ' . $cep . ' inválido']);
        }

        $response = [
            'cep' => $res['cep'],
            'state' => $res['state'],
            'city' => $res['city'],
            'neighborhood' => $res['neighborhood'],
            'street' => $res['street'],
        ];

        if (!empty($res['location']['coordinates']['latitude']) && !empty($res['location']['coordinates']['longitude'])) {
            $response['coordinates'] = [
                'latitude' => $res['location']['coordinates']['latitude'],
                'longitude' => $res['location']['coordinates']['longitude'],
            ];
        }
        return $response;
    }
}
