<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::middleware([
  EnsureFrontendRequestsAreStateful::class,
  'auth:sanctum'
])->group(function () {
  Route::get('/me', function (Request $request) {
      return response()->json(['user' => $request->user()]);
  });
  Route::delete('/users/{id}', [AuthController::class, 'destroy']);
  Route::post('/uploadpfp', [AuthController::class, 'upload']);
  Route::get('/user-profile', [AuthController::class, 'getProfile']);
  Route::get('/users', [AuthController::class, 'users']);
  Route::get('/logs', [AuthController::class, 'logs']);
  Route::patch('/users/{id}/role', [AuthController::class, 'updateRole']);
});

Route::middleware(['web'])->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [AuthController::class, 'register']);
});
