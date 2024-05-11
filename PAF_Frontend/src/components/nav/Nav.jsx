/* eslint-disable no-unused-vars */
import React from "react";
import "./nav.css";
import {Link, Navigate} from "react-router-dom";

//Fake Api....................
import CurrentUser from "../../FackApis/CurrentUserData";

// Components..................
import DarkMood from "../darkmood/DarkMood";

// FontAwesome Icon............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faEnvelope,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useUserStore from "../../hooks/useUserStore.js";

export default function Nav() {
  const user = useUserStore((state) => state.user)
  if (!user) {
    return <Navigate to="/" replace={true} />
  }
  return (
    <nav>
      <div className="nav-container">

        <div className="nav-left">
          <Link to="/">
            <h3 className="logo">FitVerse</h3>
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <div className="Nav-Searchbar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="nav-right">
          <Link to="/chatbox/id">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <Link to="/chatbox/id">
            <FontAwesomeIcon icon={faBell} />
          </Link>
          <DarkMood />
          <Link to="/chatbox/id">
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <div className="user">
            <Link to={`/profile/${user?.id}`} className="user">
            <img src={user?.profilePic} alt="" />
            <h4>{user?.firstName}</h4>
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}
