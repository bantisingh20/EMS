import React from 'react'
import { sessiondata } from '../Context/Context';
import { json, useNavigate } from 'react-router-dom';

const DefaultPage = () => {
  //console.clear();
    const { user } = sessiondata();
    console.log(user.role);
     
    const navigate = useNavigate();
    navigate('/dashboard')
  return (
    <div> 
      <h1>Hello, {user.name ? user.name : 'Guest'} !</h1>
    </div>
  )
}

export default DefaultPage
