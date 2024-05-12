// /* eslint-disable no-unused-vars */
// import React from "react";
// import "./leftBar.css";
// import { Link } from "react-router-dom";

// // Components................
// import CurrentUser from "../../FackApis/CurrentUserData";

// //Icon Image.................
// import Friend from "../../assets/icon/1.png";
// import Groups from "../../assets/icon/2.png";
// import Market from "../../assets/icon/3.png";
// import Watch from "../../assets/icon/4.png";
// import gallery from "../../assets/icon/5.png";
// import videos from "../../assets/icon/6.png";
// import messages from "../../assets/icon/7.png";
// import useUserStore from "../../hooks/useUserStore.js";

// export default function LeftBar() {
//   const user = useUserStore((state) => state.user)
//   return (
//     <div className="leftBar">
//       <div className="left-container">
//         <div className="menu">
//           <Link to={`/profile/${user?.id}`}>
//             <div className="user">
//               <img src={user?.profilePic} alt="" />
//               <h4>{user?.firstName}</h4>
//             </div>
//           </Link>

//           <Link to="/">
//             <div className="item">
//               <img src={Friend} alt="" />
//               <h4>Friends</h4>
//             </div>
//           </Link>
//           <Link to="/">
//             <div className="item">
//               <img src={Groups} alt="" />
//               <h4>Groups</h4>
//             </div>
//           </Link>
//           <Link to="/">
//             <div className="item">
//               <img src={Market} alt="" />
//               <h4>Market</h4>
//             </div>
//           </Link>
//           <Link to="/">
//             <div className="item">
//               <img src={Watch} alt="" />
//               <h4>Watch</h4>
//             </div>
//           </Link>
//         </div>

//         <hr />

//         <div className="menu">
//           <h4 className="others">Your Shortcuts</h4>
//           <Link to="/">
//             <div className="item">
//               <img src={gallery} alt="" />
//               <h4>Gallery</h4>
//             </div>
//           </Link>
//           <Link to="/">
//             <div className="item">
//               <img src={videos} alt="" />
//               <h4>Videos</h4>
//             </div>
//           </Link>
//           <Link to="/chatbox/id">
//             <div className="item">
//               <img src={messages} alt="" />
//               <h4>Messages</h4>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './leftBar.css';
import { Link } from 'react-router-dom';

// Components................
// import CurrentUser from "../../FackApis/CurrentUserData";

//Icon Image.................
import Friend from '../../assets/icon/1.png';
import Groups from '../../assets/icon/2.png';
import Market from '../../assets/icon/3.png';
import Watch from '../../assets/icon/4.png';
import gallery from '../../assets/icon/5.png';
import videos from '../../assets/icon/6.png';
import messages from '../../assets/icon/7.png';
import axios from 'axios';
import useUserStore from "../../hooks/useUserStore.js";

export default function LeftBar() {
  const user = useUserStore((state) => state.user)

  return (
    <div className="leftBar">
      <div className="left-container">
        <div className="menu">
          <Link to={`/profile/${user?.id}`}>
            <div className="user">
              <img src={user?.profilePic} alt="" />
              <h4>
                {user?.firstName } { user?.lastName}
              </h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <img src={Friend} alt="" />
              <h4>Friends</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={Groups} alt="" />
              <h4>Groups</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={Market} alt="" />
              <h4>Market</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={Watch} alt="" />
              <h4>Watch</h4>
            </div>
          </Link>
        </div>

        <hr />

        <div className="menu">
          <h4 className="others">Your Shortcuts</h4>
          <Link to="/">
            <div className="item">
              <img src={gallery} alt="" />
              <h4>Gallery</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={videos} alt="" />
              <h4>Videos</h4>
            </div>
          </Link>
          <Link to="/chatbox/id">
            <div className="item">
              <img src={messages} alt="" />
              <h4>Messages</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

