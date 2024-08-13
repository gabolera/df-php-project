<?php

namespace App\Services;

use App\Models\ZipCode;
use App\Services\BrasilApi;

class ZipCodeService
{

    public function findOrCreateZipCode(string $zipCodeCreate)
    {
        $zipCode = ZipCode::where('cep', $zipCodeCreate)->first();
        if (!$zipCode) {
            $zipCode = $this->storeZipCodeDatabase($zipCodeCreate);
        }
        return $zipCode;
    }

    public function storeZipCodeDatabase(string $zipCode)
    {
        $brasilApi = BrasilApi::getCep($zipCode);
        $zipCode = ZipCode::create([
            'cep' => $brasilApi['cep'],
            'state' => $brasilApi['state'],
            'city' => $brasilApi['city'],
            'neighborhood' => $brasilApi['neighborhood'],
            'street' => $brasilApi['street'],
            'coordinates' => $brasilApi['coordinates'] ?? null,
        ]);
        return $zipCode;
    }

    public static function isValidZipCode(string $zipCode)
    {
        return strlen(self::formatZipCode($zipCode)) === 8;
    }

    public static function formatZipCode(string $zipCode)
    {
        return preg_replace('/\D/', '', $zipCode);
    }
}
