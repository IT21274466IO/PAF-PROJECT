/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./feeds.css";

// Components..................
import CommentData from "../../FackApis/CommetData"
import CurrentUserData from '../../FackApis/CurrentUserData'

import Comments from "../comments/Comments";

//Font Awesome Icon..........
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faComment, faHeart, faListDots, faShare } from "@fortawesome/free-solid-svg-icons";

//States
import { useState } from "react";

export default function Feed({ feed }) {

  let [openComment, setOpenComment] = useState(false);
  const CommentHandler = () => {
    setOpenComment(!openComment);
  }

  return (
    <div className="feed" key={feed.id}>
      <div className="top-content">
        <Link to="/profile/id">
          <div className="user">
            <img src={feed?.user?.profilePic} alt="" />
            <div>
              <h5>{feed?.user?.firstName } {feed?.user?.lastName}</h5>
              <small>1 Minutes Ago</small>
            </div>
          </div>
        </Link>
        <span>
          <FontAwesomeIcon icon={faListDots} />
        </span>
      </div>
      <div className="mid-content">
        <p>{feed.caption}</p>
        <img src={feed.image} alt="" />
      </div>
      <div className="bottom-content">
        <div className="action-item">
          <span><FontAwesomeIcon icon={faHeart} /> 14 Likes</span>
        </div>
        <div className="action-item" onClick={CommentHandler}>
          <span><FontAwesomeIcon icon={faComment} /> 2 Comment</span>
        </div>
        <div className="action-item">
          <span><FontAwesomeIcon icon={faShare} /> 11 Shares</span>
        </div>
      </div>
      { openComment && <Comments /> }
    </div>
  );
}
