/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./stories.css";
import PopupModal from "./PopupModal"; // Import the PopupModal component

//Fake Apis..................
import CurrentUserData from "../../FackApis/CurrentUserData";

// FontAwesome Icons...........
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function UserStory() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="story userStory" onClick={toggleModal}>
      <div className="user">
        <img src={CurrentUserData.map((user) => user.ProfieImage)} alt="" />
      </div>
      <img src={CurrentUserData.map((user) => user.CoverPhoto)} alt="" />
      <label htmlFor="storyFile">
        <FontAwesomeIcon icon={faAdd} />
        <input type="file" id="storyFiles" />
      </label>
      <h5>Add Story</h5>

      {/* Render the modal conditionally */}
      {showModal && <PopupModal onClose={toggleModal} />}
    </div>
  );
}
