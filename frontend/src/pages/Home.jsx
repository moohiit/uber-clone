import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='h-screen bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1572239780645-203c467a49b5?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-5 flex justify-between w-full bg-red-400 flex-col'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png" alt="Uber Image" />
        <div className='bg-white py-4 px-4 pb-7'>
          <h2 className='text-[30px]  font-bold'>Get Started with Uber</h2>
          <Link to={'/login'} className='bg-black flex items-center justify-center text-white py-3 w-full rounded mt-5 font-semibold'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home