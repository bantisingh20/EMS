import React ,{ StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './Context/Context.jsx'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  
import { AppSessionProvider } from './Context/AppSessionContext.jsx'


createRoot(document.getElementById('root')).render(
   
  // <React.StrictMode> //iske wajah se 2 baar mount ho rha tha
    <BrowserRouter>
      <AuthContextProvider>      
        <AppSessionProvider>
          <App /> 
          </AppSessionProvider>    
            
      </AuthContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
  
)
