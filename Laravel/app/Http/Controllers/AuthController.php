<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'viewer',
        ]);

        Log::info("New registration: " . $request->email);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            Log::warning("Failed login for: " . $request->email);
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        Log::info("Successful login for: " . $request->email);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Login successful',
            'email' => $request->user()->email,
        ]);
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            Log::info("Successful logout for: " . Auth::user()->email);
        } else {
            Log::info("Logout attempt for unknown user");
        }

        Auth::logout(); 
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return response()->json(['message' => 'Logged out']);
    }

    public function users(Request $request)
    {
        $user = auth()->user();
        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'not authorized'], 501);
        }
        $users = User::all(['id', 'email', 'role']);
        return response()->json($users);
    }

    public function logs(Request $request)
    {
        $user = auth()->user();
        if (!$user || $user->role === 'viewer') {
            return response()->json(['message' => 'not authorized'], 501);
        }

        $path = storage_path('logs/laravel.log');

        if (!file_exists($path)) {
            return response()->json(['logs' => []]);
        }

        $lines = collect(file($path))->reverse()->take(100)->reverse()->values()->all();

        return response()->json(['logs' => $lines]);
    }

    public function destroy(Request $request, $id)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        try {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        Log::info("User deleted: " . $user->email);
        $user->delete();

        return response()->json(['message' => 'User deleted']);
        } catch (\Exception $e) {
            Log::error("Error deleting user: " . $e->getMessage());
            return response()->json(['message' => 'Server error', 'error' => $e->getMessage()], 500);
        }
    }

    public function upload(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'email' => 'required|email|exists:users,email',
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = User::where('email', $request->email)->first();

        $file = $request->file('profile_picture');
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs('profile_pictures', $filename, 'public');
        $urlPath = str_replace('public/', 'storage/', $path);

        $user->profile_picture = $urlPath;
        $user->save();

        \Log::info("Profile picture uploaded for: " . $user->email);

        return response()->json([
            'message' => 'Profile picture uploaded',
            'profile_picture' => $urlPath
        ]);
    }

    public function getProfile(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'email' => $user->email,
            'profile_picture' => $user->profile_picture,
        ]);
    }

    public function me(Request $request)
    {
        if (Auth::check()) {
            return response()->json([
                'authenticated' => true,
                'user' => Auth::user()
            ]);
        }

        return response()->json(['authenticated' => false], 401);
    }

    public function updateRole(Request $request, $id)
    {
        $authUser = auth()->user(); 
        if (!$authUser || $authUser->role !== 'admin') {
            return response()->json(['message' => 'Not authorized'], 403);
        }

        $request->validate([
            'role' => 'required|in:viewer,editor,admin',
        ]);

        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'Role updated successfully.']);
    }

}