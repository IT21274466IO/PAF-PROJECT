/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import './addPost.css'

// Fake Api...................
import CurrentUserData from '../../FackApis/CurrentUserData'

// Font Awesome Icon..........
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSmile, faTags, faVideo } from '@fortawesome/free-solid-svg-icons'
import toast, {Toaster} from "react-hot-toast";
import  {useCreatePost} from "../../hooks/usePost.js";

export default function AddPost() {
    const { trigger, isMutating } = useCreatePost();

    const [inputCaption, setInputCaption] = useState('');
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");

    const uploadImage = async () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET)
        data.append("cloud_name",import.meta.env.VITE_CLOUDINARY_NAME)
        const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,{
            method:"post",
            body: data
        })

        if (cloudinaryRes?.url){
            setUrl(cloudinaryRes.url)
        }
    }

    const handleInputCaptionChange = (event) => {
        setInputCaption(event.target.value);
    }

    const handleInputFileChange = (event) => {
        setImage(event.target.files[0]);
    }

    const handlePostClick = async (event) => {
        event.preventDefault();
        await uploadImage()
        try {
            const result = await trigger({
                caption: inputCaption,
                image: url
            })
            if (result?.error || !result) {
                throw new Error(result?.message);
            }else{
                toast.success( "Post uploaded successfully" );
            }
        } catch (e) {
            // error handling
            toast.error( e?.message || "Post upload failed" );
        }
    }
  return (
    <form className='postForm'>
        <Toaster />
        <div className="user form-top">
            {/*<img src={CurrentUserData.map(user => (user.ProfieImage))} alt="" />*/}
            <input value={inputCaption} onChange={handleInputCaptionChange} type="text" placeholder='What is on your mind?'/>
            <button onClick={handlePostClick} disabled={isMutating} type="button" className='btn btn-primary'>Post</button>
        </div>
        <div className="post-categories">
            <label htmlFor="file">
                <input type="file" id='file' onChange={handleInputFileChange}/>
                <span><FontAwesomeIcon icon={faImage}/> Photos</span>
            </label>
            <label htmlFor="file">
                <input type="file" id='file' onChange={handleInputFileChange}/>
                <span><FontAwesomeIcon icon={faVideo}/> Videos</span>
            </label>
            <span><FontAwesomeIcon icon={faTags}/> Tag</span>
            <span><FontAwesomeIcon icon={faSmile}/> Feelings</span>
        </div>
    </form>
  )
}
