import './App.css';
import GoogleLogin from 'react-google-login'
import { React, useState } from 'react'
import axios from 'axios'
import { Link, Route } from 'react-router-dom'
import userInfo from './components/userInfo'

function App() {

    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData') 
        ? JSON.parse(localStorage.getItem('loginData'))
        :null     
    )

  const handleFailure = (result) =>{
    console.log(result)
  }
  const handleLogin = async (response) =>{
        if (response.accessToken) {
            let result = await axios.post('http://localhost:8000/login', {
                token : response.accessToken,
                profile : response.profileObj
            })
            console.log(result)
            setLoginData(result.data.profile)
        }
  }

    const handleLogout = () =>{
        localStorage.removeItem('loginData')
        setLoginData(null)
    }

    const userinfo = () => {
      
    }

    const calPath = () => {
      
    }
  
  return (
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
                        {/* <button onClick={userinfo}>User Information</button> */}
                        <button onClick={calPath}>Use Calculator</button>
                        <userInfo />
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

export default App;
