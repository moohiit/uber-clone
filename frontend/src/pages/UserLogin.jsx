import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
const UserLogin = () => {
  const data = useContext(UserDataContext);
  console.log(data);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div className=''>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png" alt="Uber Image" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@gmail.com'
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7' />
          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'>Login</button>
          <p className='text-center'>New here? <Link to={'/signup'}
            className='text-blue-600'>Create new Account</Link></p>
        </form>
      </div>
      <div>
        <Link to={'/captain-login'} className='bg-[#1000bb9d] flex items-center justify-center text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin