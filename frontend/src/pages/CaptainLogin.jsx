import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
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
        <img className='w-16 mb-10' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="Uber Image" />

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
          <p className='text-center'>Want to Join a fleet? <Link to={'/captain-signup'}
            className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link to={'/login'} className='bg-[#7dbb0089] flex items-center justify-center text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin