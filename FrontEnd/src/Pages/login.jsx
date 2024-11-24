import { FormLabels,FormControl, Buttons ,handleError,handleSuccess  } from './Common';
import React, { useState } from 'react';
import axios from 'axios';
import {config} from '../../config';
import { ToastContainer } from 'react-toastify'; 
import { sessiondata } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
//rafce

const LoginPage =() =>{
     console.clear();
    // localStorage.clearItem("Token");
    const [LoginInData,SetLoginInData] = useState({});
    const { LoginSessionStart,logout } = sessiondata();
    const navigate = useNavigate()


    const LoginUser= async (e) =>{
        e.preventDefault();
        logout();
        //console.log(JSON.stringify(LoginInData));
        
        try {
            const response = await axios.post(`${config}/auth/login`,LoginInData);
            
            const result = await response.data;
           // console.log(result.user);

            if(result.success){
                localStorage.setItem("Token",result.token)
                LoginSessionStart(result.user);
                handleSuccess('login Successfull');

               // setTimeout(() => {
                    navigate('/dashboard');
               // }, 2000);
            }
        } catch (error) {
            console.log(error);
            handleError(error.response.data.message);
        }
    }
    return(
        <>
         <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray--100 to-50%'>
          
          <h2 className='font-sevillana text-3xl mb-3 text-white'>Employee Management System</h2>

            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
                <form onSubmit = {LoginUser}>
                    <div className='mb-4'>
                        <FormLabels label="Email" className="block text-gray-700"/>
                        <FormControl placeholder="Enter Email" type="email" className="w-full px-3 py-2 border" 
                            required={1} name="email" onChange={(e) => SetLoginInData({ ...LoginInData, [e.target.name]: e.target.value })}/>
                    </div>

                    <div className='mb-4'>
                        <FormLabels label="Password" className="block text-gray-700"/>
                        <FormControl placeholder="Enter Password" type="Password" className="w-full px-3 py-2 border" required={1}
                          name="password" onChange={(e) => SetLoginInData({ ...LoginInData, [e.target.name]: e.target.value })} />
                    </div>

                    <div className='mb-4'>
                        <Buttons type="submit" className="w-full bg-teal-600 text-white py-2" text="login" />
                    </div>
                </form>
                
                <ToastContainer />
            </div>
            
          </div> 
        </>
    );
}

export default LoginPage;