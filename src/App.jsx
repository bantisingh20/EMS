//import {BrowserRoute, Routes,Route , Navigate} from 'react-router-dom'
import React from "react";
import LoginPage from "./Pages/login";
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import {config} from '../config';
import 'react-toastify/dist/ReactToastify.css';
import DefaultPage from "./Pages/default";
import DashboardPage from "./Pages/Dashboard";
import AdminSummary from "./Dashboard/AdminSummary";
import DepartmentPage from './Masters/Department'
import EmployeesPage from './Masters/Employees'
import Leave from './Masters/Leave'
import Salary from './Masters/Salary'
import Setting from './Masters/Setting' 

function App() {
   
  return (
     
      <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/default" element={<DefaultPage />} ></Route>
          <Route path="/dashboard" element={<DashboardPage />} >{/* parent */}
             <Route index element={<AdminSummary />}></Route>
             <Route path="/dashboard/department" element={<DepartmentPage />} ></Route>
             <Route path="/dashboard/salary" element={<Salary />} ></Route>
             <Route path="/dashboard/leave" element={<Leave />} ></Route>
             <Route path="/dashboard/setting" element={<Setting />} ></Route>
             <Route path="/dashboard/employees" element={<EmployeesPage />} ></Route>
              
          </Route>
      </Routes>
    // </BrowserRouter>
 
     
  );

}

export default App
