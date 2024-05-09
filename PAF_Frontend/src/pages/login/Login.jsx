/* eslint-disable react/no-unescaped-entities */
//import React from 'react'
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>-
            <br />
            FitVerse <br />-
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit adipisci totam nam harum dolores in explicabo
            reiciendis cum numquam magni?
          </p>
          <span>Don't have an account? </span>
          <Link to="/signup">
            <button className="btn btn-primary">Signup</button>
          </Link>
        </div>
        <form className="right">
          <input type="text" required placeholder="Username" />
          <input type="password" required placeholder="Password" />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
