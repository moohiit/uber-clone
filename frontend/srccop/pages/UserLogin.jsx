import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { toast } from "react-toastify";
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);

      if (response.data.success) {  // Fixed typo
        toast.success(response.data.message || "Login successful!");
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token)
        navigate("/home");
        setEmail('');
        setPassword('');
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Error logging in.");
      console.log(error.response?.data?.message || error.message);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png" alt="Uber Image" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@gmail.com'
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            type="password"  // Fixed type
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7' />
          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'>
            Login
          </button>
          <p className='text-center'>New here? <Link to={'/signup'} className='text-blue-600'>Create new Account</Link></p>
        </form>
      </div>
      <div>
        <Link to={'/captain-login'} className='bg-[#1000bb9d] flex items-center justify-center text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'>
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
