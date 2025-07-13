import React,{ Children, createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {config} from '../../config';
const UserContext = createContext('');

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const verifyuser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${config}/api/auth/verify-user`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            LoginSessionStart(response.data.user);
          } else {
            navigate('/login');
            console.log('invalid session');
          }
        } catch (error) {
          navigate('/login');
          console.log('invalid session');
        }
      } else {
        navigate('/login');
      }
    };

    verifyuser();
  }, []);

  const LoginSessionStart = (user) => {
    setUser(user);
    localStorage.setItem("userid", user._id);
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("session");
    navigate('/login');
  };

  const getUserInfo = () => {
    return {
      employeeId: user._id || '',
      role: user.role || '',
      name: user.name || '',
    };
  };

  return (
    <UserContext.Provider value={{ user, LoginSessionStart, logout, getUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const sessiondata = () => useContext(UserContext);
export default AuthContextProvider;
