import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCaptain } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { captain, setCaptain } = useCaptain();
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchCaptain = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setCaptain(response.data.captain);
        } else {
          throw new Error("Captain not authorized");
        }
      } catch (error) {
        console.error("Error fetching captain:", error);
        localStorage.removeItem('token');
        navigate('/captain-login');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCaptain();
    }
  }, [token, navigate, setCaptain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
