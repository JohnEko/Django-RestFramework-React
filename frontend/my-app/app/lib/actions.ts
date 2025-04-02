"use server"

//we want this to run on the server not on browser for security reasons

import { cookies } from "next/headers"


export async function handleRefresh() {
    // to know where this is happening
    console.log('handlerefresh')
    const refreshToken = await getRefreshToken()
    //lets talk to the backend to get the correct token there
    const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken       
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(async (json) => {
            console.log('Response -Response', json)

            if (json.access) {
                (await cookies()).set('session_access_token', json.access, {
                    httpOnly: true,
                    //IF ITS ON PRODUCTION IT SET TO TRUE
                    secure: process.env.NODE_ENV == 'production',
                    maxAge: 60 * 60 ,  //it last for 60min before we need referesh from the server
                    path: '/'
                });

                return json.access
                // if we dont get the access token anymore we logout of the system automatically
            } else {
                resetAuthCookies();
            }
        })
        .catch((error) => {
            console.log('error', error)
            resetAuthCookies();
        })
    
    return token
}

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
        //IF ITS ON PRODUCTION IT SET TO TRUE Last for weeks
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
    let accessToken = (await cookies()).get('session_access_token')?.value
    // lets check if we dont have access token, giving a new access token by setting this one
    if (!accessToken){
        accessToken = await handleRefresh()
    }

    return accessToken
}

//Get user refresh token to stay online for a week
//it has already been set in the cookies if you take a look up above the code
export async function getRefreshToken(){
    let refreshToken = (await cookies()).get('session_refresh_token')?.value

    return refreshToken
}