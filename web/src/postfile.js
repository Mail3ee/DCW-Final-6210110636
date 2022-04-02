import { React, useState } from 'react'
import {Link} from 'react-router-dom'

function PostFile() {
    const [file, setFile] = useState()
    const [imagePreviewUrl, setImagePreviewUrl] = useState()

    const handleUploadImage = (event) => { 
        const file = event.target.files[0] 
        const reader = new FileReader(); 
        reader.onloadend = () => {
            setFile(file) 
            setImagePreviewUrl(reader.result)
        }

        reader.readAsDataURL(file)
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    Post File Component
                </div>
                <img src={imagePreviewUrl ? imagePreviewUrl :    "https://dcvta86296.i.lithium.com/t5/image/serverpage/image-  id/14321i0011CCD2E7F3C8F8/image-size/large?v=1.0&px=999"}
                    style={{width: "500px", height: "500px"}}/> 

                <input type="file"onChange={handleUploadImage}/>
                <button> Upload </button>
                <button ><Link to = "/" className="btn"> Homepage </Link></button>
            </header>
        </div>
    )
}





export default PostFile;
