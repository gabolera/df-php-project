<?php

namespace App\Helpers;

class SanitizeData
{
    public static function sanitize(array $data)
    {
        array_walk_recursive($data, function (&$value) {
            if (is_numeric($value) &&  (is_nan($value) || is_infinite($value))) {
                $value = null;
            }
        });

        return $data;
    }
}
