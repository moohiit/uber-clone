import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCaptain } from '../context/CaptainContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState()
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const { captain, setCaptain } = useCaptain();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType
      }
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
      if (response.data.success) {
        const data = response?.data;
        setCaptain(data?.captain);
        localStorage.setItem('token', data.token)
        toast.success(data.message || "Captain registered.");
        setFirstname('')
        setLastname('')
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehicleCapacity('');
        setVehiclePlate('');
        setVehicleType('');
        navigate('/captain-home');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.message || error.message || "Error occured");
    }
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div className=''>
        <img className='w-16 mb-10' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="Uber Image" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's our captain's name</h3>
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
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-5'>
            <input
              type="text"
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder='Vehicle Color'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            />
            <input
              type="text"
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              placeholder='Vehicle Plate Number'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            />
          </div>
          <div className='flex gap-4 mb-5'>
            <input
              type="number"
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder='Vehicle Capacity'
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
            >
              <option value="motorcycle">Motor Cycle</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-5'>Create Captain Account</button>
          <p className='text-center'>Already have an account? <Link to={'/captain-login'}
            className='text-blue-600'>Login</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, whatsapp or SMS messages, including by automated means, from uber and its affiliates to the number provided.</p>
      </div>
    </div>
  )
}

export default CaptainSignup