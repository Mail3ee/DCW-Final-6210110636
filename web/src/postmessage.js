import { React, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './App.css';

function PostMessage() {
    const [msgData, setMsg] = useState()
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false)
    function handleChange(event){
        setMsg({value: event.target.value}) 
    }
    
    const handleSubmit = async () =>{
        let data = JSON.parse(localStorage.getItem('loginData'))
        if (data.token) {
            // let result = await axios.post('https://dcw-6210110636.eastasia.cloudapp.azure.com:8000/post', {
            let result = await axios.post('http://localhost:8080/post', {
                token : data.token,
                profile : data.profile,
                msg : msgData.value
            })

            if (result.data.status === "ok") {
                setSuccess(true)

                setTimeout(function() {
                    setSuccess(false)
                    navigate('/')
                }, 3000);
            }
            
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {
                    success ? (
                            <div>
                                <h3>Send Message Success</h3>
                            </div>  
                        ):(
                            <>
                                <div className='textheadMessage'>
                                    Post Your Message
                                </div>
                               
                                <div>
                                    <textarea className='textareaokok' placeholder="Post Your Message" onChange={handleChange}/>
                                </div>
                                <div>
                                    <input className='btn-one-login' type="submit" onClick={handleSubmit}/>
                                    <button className='btn-tree-login' ><Link to = "/" className="btn"> Homepage </Link></button>
                                </div>
                                
                            </>
            
                        )
                }     
            </header>
        </div>
    );
}
  
export default PostMessage;
  