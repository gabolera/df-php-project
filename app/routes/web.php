<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ZipCodeDistanceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/zip-codes', [ZipCodeDistanceController::class, 'list'])->name('zipcode.list');
});


Route::get('/zip', [ZipCodeDistanceController::class, 'index']);
Route::get('/zip/{ceps}', [ZipCodeDistanceController::class, 'show'])->name('zipcode.show');
Route::post('/zip', [ZipCodeDistanceController::class, 'store'])->name('zipcode.store');

require __DIR__ . '/auth.php';
