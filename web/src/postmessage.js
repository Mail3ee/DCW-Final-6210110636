import { React, useState } from 'react'
import axios from 'axios'

function PostMessage() {
    const [msgData, setMsg] = useState()

    function handleChange(event){
        setMsg({value: event.target.value}) 
    }
    
    const handleSubmit = async () =>{
        let data = JSON.parse(localStorage.getItem('loginData'))
        if (data.token) {
            let result = await axios.post('http://localhost:8000/post', {
                token : data.token,
                profile : data.profile,
                msg : msgData.value
            })
            console.log(result.data)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                Post Your Message:
                <div>
                    <textarea placeholder="Post Your Message" onChange={handleChange}/>
                </div>
                <input type="submit" onClick={handleSubmit}/>
            </header>
        </div>
    );
}
  
export default PostMessage;
  