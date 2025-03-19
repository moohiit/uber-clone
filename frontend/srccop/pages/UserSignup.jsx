import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const UserSignup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);
      if (response.data.success) {
        toast.success(response.data.message || "User registration successfull.")
        const data = response.data
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home')
        setFirstname('')
        setLastname('')
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while registering.");
      console.log(error.response?.data?.message || error.message);
    }
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div className=''>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png" alt="Uber Image" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              type="text"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder='First name'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            />
            <input
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder='Last name'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            />
          </div>
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
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'
          />
          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-5'>Create Account</button>
          <p className='text-center'>Already have an account? <Link to={'/login'}
            className='text-blue-600'>Login</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, whatsapp or SMS messages, including by automated means, from uber and its affiliates to the number provided.</p>
      </div>
    </div>
  )
}

export default UserSignup