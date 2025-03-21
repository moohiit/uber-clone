
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/captain/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.data.success) {
            localStorage.removeItem('captain-token')
            navigate('/captain-login')
        }
    }).catch((error) => {
        console.log(error.response.data.message || error.message || "Error logging out.")
    }) 

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout