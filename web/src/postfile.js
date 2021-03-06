import { React, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './App.css';

function PostFile() {
    const [file, setFile] = useState({})
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const handleUploadImage = (event) => { 
        const file = event.target.files[0] 
        const reader = new FileReader(); 
        reader.onloadend = () => {
            setFile(file) 
            setImagePreviewUrl(reader.result)
        }

        reader.readAsDataURL(file)
    }
    const upLoadImg = async () =>{
        const  formData = new FormData()
        formData.append('img', file)
        // const result = await axios.post('http://localhost:8080/upload', formData,{

        // })
        const result = await axios.post('https://dcw-6210110636.eastasia.cloudapp.azure.com:8000/upload', formData,{

        })
        if(result.data.status === "ok") {
            setSuccess(true)

            setTimeout(function() {
                setSuccess(false)
                navigate('/')
            }, 3000);
        }

    }

    return (
        <div className="App">
            <header className="App-header">
                {
                    success ? (
                        <div>
                            <h3>Upload Success</h3>
                        </div>  
                    ):(
                        <>
                            <div className='textheadMessage'>
                                Post File Component
                            </div>
                            <img src={imagePreviewUrl ? imagePreviewUrl : "https://media.discordapp.net/attachments/888099195578380299/956506399440011274/WC_Profile.png?width=676&height=676"}
                                style={{width: "500px", height: "500px"}}/> 
                            <div className='postbtn-box'>
                                <input className='custom-file-input' type="file"onChange={handleUploadImage}/>
                                <button className='btn-one-login' onClick={upLoadImg}> Upload </button>
                                <button className='btn-tree-login' ><Link to = "/" className="btn"> Homepage </Link></button> 
                            </div>
                                
                        </>
         
                    )
                }  
            </header>
        </div>
    )
}

export default PostFile;
