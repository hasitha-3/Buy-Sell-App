import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";
import { useAppContext } from "../../MyContext";

const Login = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { info, change_info } = useAppContext();
  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', { Email, password });

      if (response.status === 200) {
        notifySuccess("Login successful");

        const user = response.data.userInfo;
        const token = response.data.token;

        // Store token & userId securely
        localStorage.setItem("userToken", token);
        localStorage.setItem("userId", user._id);

        // Update user context
        const infouser = {
          firstname: user.firstname,
          lastname: user.lastname,
          Email: user.Email,
          contact_number: user.contact_number,
          age: user.age,
          userId: user._id,
        };

        change_info(infouser);
        console.log("Updated info:", infouser); // Debugging updated info

        // Redirect to profile
        navigate(`/profile/${user._id}`);
      } else {
        notifyError("User not found");
      }
    } catch (error) {
      console.error("Login failed:", error);
      notifyError(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Updated info:", info); // Logs updated info after change_info runs
  }, [info]); // This will trigger when `info` changes

  return (
    <div className='min-h-screen flex justify-center items-center px-4'>
      <Toaster />
      <form className='glass-card w-full max-w-md p-8 rounded-2xl' onSubmit={handleLogin}>
        <h1 className='hero-title text-3xl font-bold mb-1'>Welcome Back</h1>
        <p className='text-sm text-slate-600 mb-6'>Log in to continue buying, selling, and renting.</p>

        <div className='grid gap-1 mb-4'>
          <p className='text-sm font-semibold'>Email</p>
          <input
            type='email'
            placeholder='Enter Email'
            value={Email}
            onChange={handleEmailChange}
            className='field'
            required
          />
        </div>

        <div className='grid gap-1 mb-5'>
          <p className='text-sm font-semibold'>Password</p>
          <input
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={handlePasswordChange}
            className='field'
            required
          />
        </div>

        <button
          type='submit'
          className='btn-primary my-2 w-full px-3 py-2 rounded-xl font-semibold'
        >
          Enter Marketplace
        </button>

        <div className='flex justify-center items-center w-full text-sm mt-3 text-slate-700'>
          Don't have an account?{' '}
          <Link to='/Registration' className='ml-1 text-blue-700 font-semibold hover:underline'>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
