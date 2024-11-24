import React,{ Children, createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {config} from '../../config';
import { loginClass } from '../utilis/login';
import {UserDetailsClass} from '../utilis/userdetails'

const UserContext = createContext('');

const AuthContextProvider = ({children}) =>{
  const login = new loginClass();
  const UserDetails = new UserDetailsClass()
  const [user,setUser] = useState({}); 
  const [token,setToken] = useState(""); 
  const navigate = useNavigate();

  useEffect( () => {
    const token= localStorage.getItem("Token"); 

    const verifyuser = async() =>{
      if(token){
        try {   
          const response = await axios.get(`${config}/auth/verify-user`,{
            headers:{
              "Authorization" :`Bearer ${token}`
            }
   
          })
           
          if(response.data.success){ 
             
               LoginSessionStart(response.data.user) 
             //await UserDetails.setUserDetails(response.data.user)           
          }
          else{
             navigate('/login')
             console.log('invalid session')
          }
        } catch (error) {
          //logout();
          navigate('/login')
          console.log('invalid session')
        }
      }
      else{
        navigate('/login')
      }
     
    }
    verifyuser()
  },[])

  


  const LoginSessionStart =(user) =>{
    setUser(user);  
    UserDetails.setUserDetails(user) 
    //console.log(user); 
  }


  const logout =() =>{
    UserDetails.clearUserDetails();
    localStorage.removeItem("Token");
    localStorage.removeItem("session");
    navigate('/login');
     
  }

  return(
     <UserContext.Provider value={{ user,LoginSessionStart, logout}}>
      {children}
     </UserContext.Provider>
  )
}

export const sessiondata = () => useContext(UserContext);
export default AuthContextProvider;


