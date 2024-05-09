/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="signup">
      <div className="card">
        <div className="left">
          <h2>
            - <br />
            FitVerse Signup
            <br />-
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit adipisci totam nam harum dolores in explicabo
            reiciendis cum numquam magni?
          </p>
          <span>Already have an account? </span>
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
        <form className="right">
          <input type="text" required placeholder="First Name" />
          <input type="text" required placeholder="Last Name" />
          <input type="email" required placeholder="Email" />
          <input type="password" required placeholder="Password" />
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
