import './App.css';
import { React, useState } from 'react'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import {Link} from 'react-router-dom'

function Login(){
    const [loginData, setLoginData] = useState()
    const [chkState, setchkState] = useState(false)

    const handleFailure = (result) =>{
        console.log("err")
        console.log(result)
    }
    const handleLogin = async (response) =>{
        if (response.accessToken) {
            // let result = await axios.post('https://dcw-6210110636.eastasia.cloudapp.azure.com:8000/login', {
            let result = await axios.post('http://localhost:8080/login', {
                token : response.accessToken,
                profile : response.profileObj
            })
        localStorage.setItem('loginData', JSON.stringify(result.data))
        setLoginData(result.data)
        }
    }
    

    const handleLogout = () =>{
        localStorage.removeItem('loginData')
        setLoginData(null);
    }
    
    const handleRefresh = () =>{
        let storage = localStorage.getItem('loginData')
        if (storage) {
            setLoginData(JSON.parse(storage))
        }
    }
    
    if (!chkState){
        setchkState(true)
        handleRefresh()
    }
    
    return(
        <div className="App">
        <header className="App-header">
            <h1>Google Login App</h1>
            <div>
            {
                loginData ? (
                    <div>
                        <img src = {loginData.profile.imageUrl}></img>
                        <h3>You logged in as {loginData.profile.name}</h3>
                        <div className='box-all-btn'>
                            <button className='btn-one-login' onClick={handleLogout}>Logout</button>
                            <button className='btn-two-login' ><Link to = "/postmessage" className="btn"> PostMessage </Link></button>
                            <button className='btn-tree-login' ><Link to = "/postfile" className="btn"> PostFile </Link></button>
                            
                        </div>

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