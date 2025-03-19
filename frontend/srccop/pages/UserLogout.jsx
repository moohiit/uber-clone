import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          localStorage.removeItem('token');
          toast.success(response?.data?.message || "Logout Successful.");
          navigate('/login');
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
