'use server'
//we want this to run on the server not on browser for security reasons

import { cookies } from "next/headers"

export async function handleLogin(userId:string, accessToken: string, refreashToken: string) {
// this show how long to store user id in the cookies
    (await cookies()).set('session_userId', userId, {
        httpOnly: true,
        //IF ITS ON PRODUCTION IT SET TO TRUE
        secure: process.env.NODE_ENV == 'production',
        maxAge: 60 * 60 * 24 * 7,  //ONE WEEK
        path: '/'
    });

    (await cookies()).set('session_access_token', accessToken, {
        httpOnly: true,
        //IF ITS ON PRODUCTION IT SET TO TRUE
        secure: process.env.NODE_ENV == 'production',
        maxAge: 60 * 60 ,  //it last for 60min before we need referesh from the server
        path: '/'
    });

    (await cookies()).set('session_refreash_token', refreashToken, {
        httpOnly: true,
        //IF ITS ON PRODUCTION IT SET TO TRUE
        secure: process.env.NODE_ENV == 'production',
        maxAge: 60 * 60 *24 * 7, //value for one week
        path: '/'
    });

}

//this will reset all of the three cookies
export async function resetAuthCookies() {
    (await cookies()).set('session_userId', '');
    (await cookies()).set('session_access_token', '');
    (await cookies()).set('session_refreash_token', '');
}

// GET DATA USER ID
export async function getUserId() {
    const userId = (await cookies()).get('session_userId')?.value
    return userId ? userId : null
}
//Get user access token
export async function getAccessToken(){
    let accessToken = (await cookies()).get('session_access_token')?.value;

    return accessToken
}