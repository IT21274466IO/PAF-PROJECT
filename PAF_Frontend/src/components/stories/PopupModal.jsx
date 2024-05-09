/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./PopupModal.css"; // Style your modal with CSS

export default function PopupModal({ onClose }) {
  const handleSubmit = (event) => {
    // Handle form submission here
    event.preventDefault();
    // You can add your form submission logic here
    // For example, you can send the form data to an API
    // Once the form is submitted, you might want to close the modal
    onClose();
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="popup-modal" onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Story</h2>
        <form onSubmit={handleSubmit} className="storyForm">
          {/* Add your form fields here */}
          {/* <label htmlFor="storyContent">Story Content:</label> */}
          <input type="file" onClick={stopPropagation} />
          <textarea id="storyContent" placeholder="What's on your mind?" className="storyText" onClick={stopPropagation} required />
          <button className='btn btn-primary' type="submit" onClick={stopPropagation}>Submit</button>
        </form>
      </div>
    </div>
  );
}
