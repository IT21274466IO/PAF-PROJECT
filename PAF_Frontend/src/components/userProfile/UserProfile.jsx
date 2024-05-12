/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import "./userProfile.css";
import {Link, useParams} from "react-router-dom";

// Fake Apis....................
import CurrentUserData from "../../FackApis/CurrentUserData";

// Font Awesome icons..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";
import {useGetUser, useUpdateUser} from "../../hooks/useUser.js";
import toast from "react-hot-toast";
import useUserStore from "../../hooks/useUserStore.js";

export default function UserProfile() {
  let { id } = useParams();
  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)
  const { trigger, isMutating } = useUpdateUser();
  const { data, error, isLoading } = useGetUser(id);

  useEffect(() => {
    setUser(data)
  }, [data]);

  const [modal, setModal] = useState(false);
  const [inputFirstName, setInputFirstName] = useState(user?.firstName);
  const [inputLastName, setInputLastName] = useState(user?.lastName);
  const [inputEmail, setInputEmail] = useState(user?.email);

  const [imageCover, setImageCover ] = useState("");
  const [imageProf, setImageProf ] = useState("");

  useEffect(()=>{
    setInputFirstName(user?.firstName);
    setInputLastName(user?.lastName);
    setInputEmail(user?.email);
  },[user])

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal){
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  const handleFirstNameChange = (event) => {
    setInputFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setInputLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setInputEmail(event.target.value);
  };

  const handleInputCoverChange = (event) => {
    setImageCover(event.target.files[0]);
  }

  const handleInputProfChange = (event) => {
    setImageProf(event.target.files[0]);
  }

  const uploadFile = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET)
    data.append("cloud_name",import.meta.env.VITE_CLOUDINARY_NAME)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,{
      method:"post",
      body: data
    })
    const data2 = await res.json()
    return data2
  }


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Add logic to handle form submission and update user details
    try {
      const imgCover = await uploadFile(imageCover);
      const imgProf = await uploadFile(imageProf);

            const result = await trigger({
              firstName: inputFirstName,
              lastName: inputLastName,
              email: inputEmail,
              coverPic: imgCover?.secure_url || user?.coverPic,
              profilePic: imgProf?.secure_url || user?.profilePic,
            })
            if (result?.error || !result) {
              throw new Error(result?.message);
            }else{
              setUser(result);
              toast.success( "Profile uploaded successfully" );
            }


    } catch (e) {
      // error handling
      toast.error( e?.message || "Profile upload failed" );
    }finally {
      toggleModal();
    }

     // Close the modal after form submission
  };
  
  return (
    <div className="userProfile">
      <div className="cover-photos">
        <img src={user?.coverPic} alt="" />
      </div>
      <div className="profile-info">
        <img src={user?.profilePic} alt="" />
        <div className="user-name">
          <h3>{user?.firstName} {user?.lastName}</h3>
          <h5>{user?.email}</h5>
        </div>
        <div className="profile-button">
          <Link to="/chatbox/id">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faMessage} />
            </button>
          </Link>
          <button className="btn btn-primary" onClick={toggleModal}>
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </button>
          <button className="btn">
            <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
        <p className="bio">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sapiente necessitatibus alias iure deleniti. Eos blanditiis fugit quos quam ad!
        </p>
      </div>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="editProfileModel">Edit Profile</h2>
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input onChange={handleInputProfChange} type="file" id="profilePicture" name="profilePicture" placeholder="Enter new profile picture URL"/>
                
                <label htmlFor="coverPhoto">Cover Photo:</label>
                <input onChange={handleInputCoverChange} type="file" id="coverPhoto" name="coverPhoto" placeholder="Enter new cover photo URL"/>
                
                <label htmlFor="firstName">First Name:</label>
                <input value={inputFirstName} onChange={handleFirstNameChange} type="text" id="firstName" name="firstName" placeholder="Enter new first name"/>
                
                <label htmlFor="lastName">Last Name:</label>
                <input value={inputLastName} onChange={handleLastNameChange} type="text" id="lastName" name="lastName" placeholder="Enter new last name"/>
                
                <label htmlFor="email">Email:</label>
                <input value={inputEmail} onChange={handleEmailChange} type="email" id="email" name="email" placeholder="Enter new email address"/>

                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button disabled={isMutating} type="button" className='btn btn-red' onClick={toggleModal}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}