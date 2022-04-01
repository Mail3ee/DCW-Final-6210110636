import './App.css';
import { React, useState } from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import {Link, Routes, Route} from 'react-router-dom'
import PostMessage from './postmessage'

function Login(){
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData') 
        ? JSON.parse(localStorage.getItem('loginData'))
        :null     
    )

    const handleFailure = (result) =>{
    /*  Fail Login to Google */
    }
    const handleLogin = async (response) =>{
        if (response.accessToken) {
            let result = await axios.post('http://localhost:8000/login', {
                token : response.accessToken,
                profile : response.profileObj
            })
        // console.log(result)
        setLoginData(result.data.profile)

        }
    }

    const handleLogout = () =>{
        localStorage.removeItem('loginData')
        setLoginData(null);
    }
    
    return(
        <div className="App">
        <header className="App-header">
            <h1>Google Login App</h1>
            <div>
            {
                loginData ? (
                    <div>
                        <img src = {loginData.imageUrl}></img>
                        <h3>You logged in as {loginData.name}</h3>
                        <button onClick={handleLogout}>Logout</button>
                        <button ><Link to = "/postmessage" className="btn"> PostMessage </Link></button>
                    </div>  
                ):(
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText = "Login with Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}>
                    </GoogleLogin>
                )
            }
            </div>
        </header>
        </div>
    );
}


export default Login