import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState()
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullname: {
        firstname: firstname,
        lastname:lastname
      },
      email: email,
      password:password
    })
    console.log("USerData: ",userData);
    setFirstname('')
    setLastname('')
    setEmail('');
    setPassword('');
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
          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-5'>Sign Up</button>
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