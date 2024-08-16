<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class RateLimit
{
    public static function check(string $key, int $freeLimit = 5, int $userLimit = 15)
    {
        if (Auth::id()) {
            if (RateLimiter::tooManyAttempts('logged-' . Auth::id(), $userLimit)) {
                throw ValidationException::withMessages(['Limite de consultas atingido']);
            }
            RateLimiter::increment('logged-' . Auth::id());
        } else {
            if (RateLimiter::tooManyAttempts('free-' . $key . request()->ip(), $freeLimit)) {
                throw ValidationException::withMessages(['Limite de consultas atingido, crie uma conta para mais consultas']);
            }
            RateLimiter::increment('free-' . $key . request()->ip());
        }
    }
}
