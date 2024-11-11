import React from "react";
import './ButtonLoginGoogle.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';



export default function ButtonLoginGoogle() {

    const responseGoogle = (response) => {
        console.log(response)
        

    }


    return (
        <>
            <div className="container-GoogleOAuth">

                <GoogleOAuthProvider clientId="462437160208-fd9uho4k7mar1sck9kaq9vna41nb7e0d.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={responseGoogle}
                        onError=""
                    />
                </GoogleOAuthProvider>      

            </div>

        </>
    )
}