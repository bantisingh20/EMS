import React,{ Children, createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {config} from '../../config';

const UserContext = createContext();

const AuthContext = ({children}) =>{

  const [user,setUser] = useState({}); 
  const [token,setToken] = useState(""); 
  const navigate = useNavigate();

  useEffect( () => {
    //debugger;
    const token= localStorage.getItem("Token");
    //console.log("token  "+token);
     
    const verifyuser = async() =>{
      if(token){
        try {  
          //console.log(token);
          const response = await axios.get(`${config}/auth/verify-user`,{
            headers:{
              "Authorization" :`Bearer ${token}`
            }
   
          })
          
          //console.log("res " + response.data)
          if(response.data.success){
              //setUser(JSON.stringify(response.data.user))
              //console.log(response.data.user);
              LoginSessionStart(response.data.user)           
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
    //console.log(user.name);
  }


  const logout =() =>{
    setUser({});
    localStorage.removeItem("Token");
    localStorage.removeItem("session");
    navigate('/login');
     
  }

  return(
     <UserContext.Provider value={{user, LoginSessionStart, logout}}>
      {children}
     </UserContext.Provider>
  )
}

export const sessiondata = () => useContext(UserContext);
export default AuthContext;


