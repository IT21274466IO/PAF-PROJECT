/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import "./PopupModal.css";
import toast from "react-hot-toast";
import {useCreateStory} from "../../hooks/useStory.js"; // Style your modal with CSS

export default function PopupModal({ onClose }) {
  const { trigger, isMutating } = useCreateStory();

  const [inputCaption, setInputCaption] = useState('');
  const [image, setImage ] = useState("");




  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleInputFileChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleInputCaptionChange = (event) => {
    setInputCaption(event.target.value);
  }

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET)
      data.append("cloud_name",import.meta.env.VITE_CLOUDINARY_NAME)

      fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,{
        method:"post",
        body: data
      })
          .then(resp => resp.json())
          .then(async (data)  => {
            const result = await trigger({
              caption: inputCaption,
              image:  data.url
            })
            if (result?.error || !result) {
              throw new Error(result?.message);
            }else{
              toast.success( "Post uploaded successfully" );
            }
          })
          .catch(err => toast.error( "Post upload failed" ))
    } catch (e) {
      // error handling
      toast.error( e?.message || "Post upload failed" );
    }finally {
      onClose()
    }

  }

  return (
    <div className="popup-modal" onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Story</h2>
        <form  className="storyForm">
          <input type="file" onChange={handleInputFileChange} />
          <textarea value={inputCaption} onChange={handleInputCaptionChange} id="storyContent" placeholder="What's on your mind?" className="storyText" onClick={stopPropagation} required />
          <button className='btn btn-primary' type="submit" onClick={handleSubmitClick}>Submit</button>
        </form>
      </div>
    </div>
  );
}
