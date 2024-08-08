<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class BrasilApi
{
    private const BASE_URL = 'https://brasilapi.com.br/api/cep/v2/';
    public static function getCep(string $cep): array
    {
        $res = Http::get(self::BASE_URL . $cep);
        if($res->clientError()){
            return [];
        }
        return $res->json();
    }
}
