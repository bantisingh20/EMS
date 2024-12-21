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
import DesignationPage from './Masters/Designation'
import EmployeesPage from './Masters/Employees'
import Salary from './Masters/Salary/Salary'
import Setting from './Pages/Setting' 
import { ToastContainer } from "react-toastify";
import EmployeeDetailPage from "./Masters/Employee/ViewEmployee";
import SalaryMasterPage from "./Masters/Salary/SalaryNew";
import ChangePasswordModal from "./Pages/ChangePassword";
import LeaveDashboard from "./Pages/Leave/leavedashboard";
import LeaveForm from "./Pages/Leave/LeaveForm";
//import './App.css';

function App() {
   
  const employee = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    position: "Software Developer",
    department: "Engineering",
  };


  return (
     <>
      <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />}></Route>
          <Route path="/login" element={<LoginPage />} ></Route>
          <Route path="/default" element={<DefaultPage />} ></Route>
          
          <Route path="/dashboard" element={<DashboardPage />} >{/* parent */}
             <Route index element={<AdminSummary />}></Route>
             <Route path="/dashboard/change-password" element={<ChangePasswordModal />} ></Route>
             <Route path="/dashboard/department" element={<DepartmentPage />} ></Route>
             <Route path="/dashboard/designation" element={<DesignationPage />} ></Route>
             <Route path="/dashboard/salary" element={<Salary />} ></Route>
             <Route path="/dashboard/leave" element={<LeaveDashboard />} ></Route>
             <Route path="/dashboard/leavedashboard" element={<LeaveDashboard />} ></Route>
             <Route path="/dashboard/leaves/apply-leave" element={<LeaveForm />}></Route>
             <Route path="/dashboard/setting" element={<Setting />} ></Route>
             <Route path="/dashboard/employees" element={<EmployeesPage />} ></Route>
             <Route path="/dashboard/salarynew" element={<SalaryMasterPage />} ></Route>
             <Route path="/dashboard/employees/ViewEmployee" element={<EmployeeDetailPage employee={employee}/>} ></Route>                          
          </Route>
          
      </Routes>
     <ToastContainer />
     </>
     
    // </BrowserRouter>
 
     
  );

}

export default App
