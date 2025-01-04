//import {BrowserRoute, Routes,Route , Navigate} from 'react-router-dom'
import React from "react";
import LoginPage from "./Pages/login";
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import DefaultPage from "./Pages/default";
import DashboardPage from "./Pages/Dashboard";
import AdminSummary from "./Dashboard/AdminSummary";
import DepartmentPage from './Masters/Department'
import DesignationPage from './Masters/Designation'
import EmployeesPage from './Pages/Employee/Employees'
import Salary from './Masters/Salary/Salary'
import Setting from './Pages/Setting' 
import { ToastContainer } from "react-toastify";
import EmployeeDetailPage from "./Pages/Employee/ViewEmployee";
import SalaryMasterPage from "./Masters/Salary/SalaryNew";
import ChangePasswordModal from "./Pages/ChangePassword";
import LeaveDashboard from "./Pages/Leave/leavedashboard";
import LeaveForm from "./Pages/Leave/LeaveForm";
import EmployeeProfile from "./Pages/Attendence/Attendence";
import 'react-toastify/dist/ReactToastify.css'; 
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
             <Route path="/dashboard/edit-department/id:" element={<DepartmentPage />} ></Route>
             <Route path="/dashboard/designation" element={<DesignationPage />} ></Route>
             <Route path="/dashboard/salary" element={<Salary />} ></Route>
             <Route path="/dashboard/leave/leavedashboard" element={<LeaveDashboard />} ></Route>
             
              
              {/* EmployeeRoute */}
              <Route path="/dashboard/list-employees" element={<EmployeesPage />} ></Route>    
              <Route path="/dashboard/add-new-employees" element={<EmployeesPage />} ></Route>              
              <Route path="/dashboard/edit-employees/id:" element={<EmployeesPage />} ></Route>              
              <Route path="/dashboard/employees/my-[profile" element={<EmployeeDetailPage employee={employee}/>} ></Route>                          
              
                {/* Attendence route */}
                <Route path="/dashboard/Attendence" element={<EmployeeProfile />} ></Route>
              
             <Route path="/dashboard/leaves/apply-leave" element={<LeaveForm />}></Route>
             <Route path="/dashboard/setting" element={<Setting />} ></Route>
             
             <Route path="/dashboard/salarynew" element={<SalaryMasterPage />} ></Route>
          </Route>
          
      </Routes>
     <ToastContainer />
     </>
     
    // </BrowserRouter>
 
     
  );

}

export default App
