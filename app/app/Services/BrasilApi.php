<?php

namespace App\Services;

use Error;
use Illuminate\Support\Facades\Http;

class BrasilApi
{
    private const BASE_URL = 'https://brasilapi.com.br/api/cep/v2/';
    public static function getCep(string $cep): array
    {
        $res = Http::get(self::BASE_URL . $cep);
        if($res->clientError()){
            throw new Error('CEP not found');
        }

        $res = $res->json();

        if(empty($res['cep'])){
            throw new Error('CEP not found');
        }

        $response = [
            'cep' => $res['cep'],
            'state' => $res['state'],
            'city' => $res['city'],
            'neighborhood' => $res['neighborhood'],
            'street' => $res['street'],
        ];

        if(!empty($res['location']['coordinates']['latitude']) && !empty($res['location']['coordinates']['longitude'])){
            $response['coordinates'] = [
                'latitude' => $res['location']['coordinates']['latitude'],
                'longitude' => $res['location']['coordinates']['longitude'],
            ];
        }
        return $response;
    }
}
