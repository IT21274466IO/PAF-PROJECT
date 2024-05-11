/* eslint-disable react/no-unescaped-entities */
import toast, { Toaster } from 'react-hot-toast';
//import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import "./login.css";
import {useState} from "react";
import {useSignIn} from "../../hooks/useAuth.js";
import useAuthStore from "../../hooks/useAuthStore.js";


export default function Login() {
  const { trigger, isMutating } = useSignIn()
  const setAuthToken = useAuthStore((state) => state.setAuthToken)
  const navigate = useNavigate();

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleInputUsernameChange = (event) => {
    setInputUsername(event.target.value);
  };

  const handleInputPasswordChange = (event) => {
    setInputPassword(event.target.value);
  };

  const handleLoginClick = async () => {
    try {
      const result = await trigger({ email: inputUsername, password:inputPassword })
      if (result?.error || !result) {
        throw new Error(result?.message);
      }else{
        toast.success( "Login Success" );
        setAuthToken(result?.token);
        navigate("/");
      }
    } catch (e) {
      // error handling
      toast.error( e?.message || "Login Failed" );
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <Toaster />
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
          <input value={inputUsername} onChange={handleInputUsernameChange} type="text" required placeholder="Username" />
          <input value={inputPassword} onChange={handleInputPasswordChange} type="password" required placeholder="Password" />
          <button onClick={handleLoginClick} disabled={isMutating} type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
