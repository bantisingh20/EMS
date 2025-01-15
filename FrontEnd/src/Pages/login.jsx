import { FormLabels,FormControl, Buttons ,handleError,handleSuccess  } from './Common';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'; 
import { sessiondata } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
//rafce

const LoginPage =() =>{
     console.clear();
    // localStorage.clearItem("Token");
    const [LoginInData,SetLoginInData] = useState({});
    const { LoginSessionStart,logout } = sessiondata();
    const navigate = useNavigate()


    const LoginUser= async (e) =>{
        e.preventDefault();
       
        try {
            const response = await axiosInstance.post(`/auth/login`,LoginInData);
            console.log(response);          
            if(response.success){
                //debugger;
                localStorage.setItem("Token",response.token)
                LoginSessionStart(response.user);
                
                handleSuccess('login Successfull');
                //navigate('/dashboard');
                window.location.href = '/dashboard';
            }
        } catch (error) {
            console.log(`Error: ${error}`);
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