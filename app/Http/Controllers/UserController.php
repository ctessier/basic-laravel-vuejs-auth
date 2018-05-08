<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Return the current authenticated user resource.
     *
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request)
    {
        $currentUser = $request->user();
        $imageUrl = 'https://www.gravatar.com/avatar/' . md5(strtolower(trim($currentUser->email))) . '?s=20';

        return response()->json([
            'name' => $currentUser->name,
            'email' => $currentUser->email,
            'image_url' => $imageUrl,
        ]);
    }
}
