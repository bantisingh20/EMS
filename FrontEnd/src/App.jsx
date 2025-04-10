//import {BrowserRoute, Routes,Route , Navigate} from 'react-router-dom'
import React from "react";
import LoginPage from "./Pages/login";
import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import DefaultPage from "./Pages/default";
import DashboardPage from "./Pages/Dashboard";
import AdminSummary from "./Dashboard/AdminSummary";
import  { DepartmentList,DepartmentPage } from './Masters/Department'
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
import {DesignationSubmitPage,DesignationListPage } from './Masters/DesignationNew'
import { EmployeeSubmitPage } from "./Masters/Employee";
import 'react-toastify/dist/ReactToastify.css'; 
import AssignRole from "./Masters/AssignRole";
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
             <Route path="change-password" element={<ChangePasswordModal />} ></Route>
             <Route path="save/department" element={<DepartmentPage mode="new" />} ></Route>
             <Route path="edit-department/:id" element={<DepartmentPage mode="edit" />} />
             <Route path="list-department" element={<DepartmentList />} ></Route>

             <Route path="save/designation" element={<DesignationSubmitPage mode="new" />} ></Route>
             <Route path="edit-designation/:id" element={<DesignationSubmitPage mode="edit" />} />
             <Route path="list-designation" element={<DesignationListPage />} ></Route>
 
             <Route path="salary" element={<Salary />} ></Route>
             <Route path="leave/leavedashboard" element={<LeaveDashboard />} ></Route>
             
                  <Route path="list-EmployeeSubmitPage" element={<EmployeeSubmitPage />} ></Route> 
              {/* EmployeeRoute */}
              <Route path="list-employees" element={<EmployeesPage />} ></Route>    
              <Route path="add-new-employees" element={<EmployeesPage />} ></Route>              
              <Route path="edit-employees/id:" element={<EmployeesPage />} ></Route>              
              <Route path="employees/my-[profile" element={<EmployeeDetailPage employee={employee}/>} ></Route>                          
              
              {/* Attendence route */}
              <Route path="Attendence" element={<EmployeeProfile />} ></Route>
              
              <Route path="leaves/apply-leave" element={<LeaveForm />}></Route>
              <Route path="setting" element={<Setting />} ></Route>
             
              <Route path="salarynew" element={<SalaryMasterPage />} ></Route>
              <Route path="Role/Assign-Role-To-Employee" element={<AssignRole />} ></Route>
          </Route>
          
      </Routes>
     <ToastContainer />
     </>
     
    // </BrowserRouter>
 
     
  );

}

export default App
