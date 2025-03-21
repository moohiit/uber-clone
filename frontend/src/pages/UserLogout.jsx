import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.data.success) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    }).catch((error) => {
        console.log(error.response.data.message || error.message || "Error logging out.")
    })

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout
