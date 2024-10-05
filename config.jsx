// src/config.js
 
const config =  "http://localhost:3000";
const Token = localStorage.getItem("Token");

const bodyheader = {
    headers:{
        "Authorization" :`Bearer ${Token}`
      }
}
  
export {config,Token,bodyheader}