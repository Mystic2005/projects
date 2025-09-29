<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum', 'role:viewer')->group(function () {
    Route::get('/profile', function () {
        return view('profile');
    });
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '^(?!api|storage).*$');