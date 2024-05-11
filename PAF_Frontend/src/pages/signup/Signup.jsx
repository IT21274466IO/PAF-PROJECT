/* eslint-disable react/no-unescaped-entities */
import toast, { Toaster } from 'react-hot-toast';
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import "./signup.css";
import {Link, useNavigate } from "react-router-dom";
import { useSignup} from "../../hooks/useAuth.js";
import useAuthStore from "../../hooks/useAuthStore.js";

export default function Signup() {
  const { trigger, isMutating } = useSignup()
  const setAuthToken = useAuthStore((state) => state.setAuthToken)
  const navigate = useNavigate();

  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputGender, setInputGender] = useState('');

  const handleInputFirstNameChange = (event) => {
    setInputFirstName(event.target.value);
  };

  const handleInputLastNameChange = (event) => {
    setInputLastName(event.target.value);
  };

  const handleInputEmailChange = (event) => {
    setInputEmail(event.target.value);
  };

  const handleInputPasswordChange = (event) => {
    setInputPassword(event.target.value);
  };

  const handleInputGenderChange = (event) => {
    setInputGender(event.target.value);
  };

  const handleSignUpClick = async (event) => {
    event.preventDefault();
    try {
      const result = await trigger({
          firstName: inputFirstName,
          lastName: inputLastName,
          email: inputEmail,
          password: inputPassword,
          gender: inputGender
         })
      if (result?.error || !result) {
        throw new Error(result?.message);
      }else{
        toast.success( "Signup Success" );
        setAuthToken(result?.token);
        navigate("/");
      }
    } catch (e) {
      // error handling
      toast.error( e?.message || "Signup Failed" );
    }
  };

  return (
    <div className="signup">
      <div className="card">
        <div className="left">
          <Toaster />
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
          <input value={inputFirstName} onChange={handleInputFirstNameChange} type="text" required placeholder="First Name" />
          <input value={inputLastName} onChange= {handleInputLastNameChange} type="text" required placeholder="Last Name" />
          <input value={inputEmail} onChange={handleInputEmailChange} type="email" required placeholder="Email" />
          <input value={inputPassword} onChange={handleInputPasswordChange} type="password" required placeholder="Password" />
          <input value={inputGender} onChange={handleInputGenderChange} type="text" required placeholder="Gender" />
          <button onClick={handleSignUpClick} disabled={isMutating} type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
