/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./userProfile.css";
import { Link } from "react-router-dom";

// Fake Apis....................
import CurrentUserData from "../../FackApis/CurrentUserData";

// Font Awesome icons..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";

export default function UserProfile() {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal){
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission and update user details
    toggleModal(); // Close the modal after form submission
  };
  
  return (
    <div className="userProfile">
      <div className="cover-photos">
        <img src={CurrentUserData.map((user) => user.CoverPhoto)} alt="" />
      </div>
      <div className="profile-info">
        <img src={CurrentUserData.map((user) => user.ProfieImage)} alt="" />
        <div className="user-name">
          <h3>{CurrentUserData.map((user) => user.name)}</h3>
          <h5>{CurrentUserData.map((user) => user.username)}</h5>
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
                <input type="file" id="profilePicture" name="profilePicture" placeholder="Enter new profile picture URL"/>
                
                <label htmlFor="coverPhoto">Cover Photo:</label>
                <input type="file" id="coverPhoto" name="coverPhoto" placeholder="Enter new cover photo URL"/>
                
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter new first name"/>
                
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter new last name"/>
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter new email address"/>

                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className='btn btn-red' onClick={toggleModal}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}