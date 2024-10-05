import React ,{ StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContext from './Context/Context.jsx'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  


createRoot(document.getElementById('root')).render(
   
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <App />
      </AuthContext>
    </BrowserRouter>
  </StrictMode>
  
)
