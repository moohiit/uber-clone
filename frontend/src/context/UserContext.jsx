import React, { createContext, useContext, useState } from 'react'
export const UserDataContext = createContext();
// Custom hook to use the CaptainContext
export const useUser = () => {
  return useContext(UserDataContext);
};
const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName:''
    },
  })
  return (
    <UserDataContext.Provider value={{user,setUser}}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext