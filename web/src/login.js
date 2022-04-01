import './App.css';
import { React, useState } from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import {Link} from 'react-router-dom'

function Login(){
    const [loginData, setLoginData] = useState()

    const handleFailure = (result) =>{
        console.log("err")
        console.log(result)
    }
    const handleLogin = async (response) =>{
        if (response.accessToken) {
            let result = await axios.post('https://dcw-6210110636.eastasia.cloudapp.azure.com:8000/login', {
                token : response.accessToken,
                profile : response.profileObj
            })
        localStorage.setItem('loginData', JSON.stringify(result.data))
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