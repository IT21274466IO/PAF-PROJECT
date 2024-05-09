/* eslint-disable no-unused-vars */
import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

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

export default function Nav() {
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
            <img src={CurrentUser.map((user) => user.ProfieImage)} alt="" />
            <h4>Batman</h4>
          </div>
        </div>

      </div>
    </nav>
  );
}
