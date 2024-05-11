/* eslint-disable no-unused-vars */
import React from "react";
import "./userProfile.css";
import {Link, Navigate} from "react-router-dom";

// Fake Apis....................
import CurrentUserData from "../../FackApis/CurrentUserData";

// Font Awesome icons..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";
import {  useParams } from 'react-router-dom';
import {useGetUser} from "../../hooks/useUser.js";

export default function UserProfile() {
  let { id } = useParams();
  const { data, error, isLoading } = useGetUser(id);
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>

  return (
    <div className="userProfile">
      <div className="cover-photos">
        <img src={data?.coverPic} alt="" />
      </div>
      <div className="profile-info">
        <img src={data?.profilePic} alt="" />
        <div className="user-name">
          <h3>{data?.firstName} {data?.lastName}</h3>
          <h5>{data?.email}</h5>
        </div>
        <div className="profile-button">
          <Link to="/chatbox/id">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faMessage} />
            </button>
          </Link>
          <button className="btn btn-primary">
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
    </div>
  );
}
