// /* eslint-disable no-unused-vars */
// import React from "react";
// import "./nav.css";
// import {Link, Navigate} from "react-router-dom";

// //Fake Api....................
// import CurrentUser from "../../FackApis/CurrentUserData";

// // Components..................
// import DarkMood from "../darkmood/DarkMood";

// // FontAwesome Icon............
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faBell,
//   faEnvelope,
//   faHome,
//   faSearch,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import useUserStore from "../../hooks/useUserStore.js";

// export default function Nav() {
//   const user = useUserStore((state) => state.user)
//   if (!user) {
//     return <Navigate to="/" replace={true} />
//   }
//   return (
//     <nav>
//       <div className="nav-container">

//         <div className="nav-left">
//           <Link to="/">
//             <h3 className="logo">FitVerse</h3>
//           </Link>
//           <Link to="/">
//             <FontAwesomeIcon icon={faHome} />
//           </Link>
//           <Link to="/">
//             <FontAwesomeIcon icon={faUser} />
//           </Link>
//           <div className="Nav-Searchbar">
//             <FontAwesomeIcon icon={faSearch} />
//             <input type="text" placeholder="Search..." />
//           </div>
//         </div>

//         <div className="nav-right">
//           <Link to="/chatbox/id">
//             <FontAwesomeIcon icon={faEnvelope} />
//           </Link>
//           <Link to="/chatbox/id">
//             <FontAwesomeIcon icon={faBell} />
//           </Link>
//           <DarkMood />
//           <Link to="/chatbox/id">
//             <FontAwesomeIcon icon={faBars} />
//           </Link>
//           <div className="user">
//             <Link to={`/profile/${user?.id}`} className="user">
//             <img src={user?.profilePic} alt="" />
//             <h4>{user?.firstName}</h4>
//             </Link>
//           </div>
//         </div>

//       </div>
//     </nav>
//   );
// }
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom';

// Fake Api....................
// import CurrentUser from '../../FackApis/CurrentUserData';

// Components..................
import DarkMood from '../darkmood/DarkMood';

// FontAwesome Icon............
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faEnvelope,
  faHome,
  faSearch,
  faUser,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Nav() {
  const [token, setToken] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);

    const fetchUser = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const currentUser = await axios.get(
          'http://localhost:5454/api/users/profile',
          { headers }
        );
        setCurrentUserData(currentUser.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    console.log(currentUserData);
  }, [token]);

  const navigate = useNavigate();

  const destroyToken = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const updateProfile = () => {
    navigate('/profile/:id');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
          {token === null ? (
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} />
            </Link>
          ) : (
            <div className="user">
              <div className="profile" onClick={toggleDropdown}>
                <img src={currentUserData.profilePic} alt="" />
              </div>
              {showDropdown && (
                <div className="dropdown">
                  <span onClick={updateProfile}>
                    {currentUserData.firstName + ' ' + currentUserData.lastName}
                  </span>
                  <div onClick={destroyToken}>Logout</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
