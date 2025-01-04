import React ,{ StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './Context/Context.jsx'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  
import { LocationProvider } from './Context/LocationContext.jsx'


createRoot(document.getElementById('root')).render(
   
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>   
        {/* <LocationProvider>  */}
        <App />
        {/* </LocationProvider>     */}
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
  
)
