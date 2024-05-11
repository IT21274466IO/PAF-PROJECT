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

    const handleInputPostDescChange = (event) => {
        setInputCaption(event.target.value);
    }

    const handlePostClick = async (event) => {
        event.preventDefault();
        try {
            const result = await trigger({
                caption: inputCaption,
                image: ""
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
            <input value={inputCaption} onChange={handleInputPostDescChange} type="text" placeholder='What is on your mind?'/>
            <button onClick={handlePostClick} disabled={isMutating} type="button" className='btn btn-primary'>Post</button>
        </div>
        <div className="post-categories">
            <label htmlFor="file">
                <input type="file"id='file'/>
                <span><FontAwesomeIcon icon={faImage}/> Photos</span>
            </label>
            <label htmlFor="file">
                <input type="file" id='file'/>
                <span><FontAwesomeIcon icon={faVideo}/> Videos</span>
            </label>
            <span><FontAwesomeIcon icon={faTags}/> Tag</span>
            <span><FontAwesomeIcon icon={faSmile}/> Feelings</span>
        </div>
    </form>
  )
}
