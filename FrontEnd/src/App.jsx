// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'; 
// import { Suspense } from "react";
// import ErrorBoundary from "./ErrorBoundary";
// import LayOut from './LayOut/LayOut';  

// // Lazy-loaded components
// const LoginPage = React.lazy(() => import('./Pages/login'));
// const DefaultPage = React.lazy(() => import('./Pages/default'));
// const AdminSummary = React.lazy(() => import('./Dashboard/AdminSummary'));
// const DepartmentList = React.lazy(() => import('./Masters/Department').then(module => ({ default: module.DepartmentList })));
// const DepartmentPage = React.lazy(() => import('./Masters/Department').then(module => ({ default: module.DepartmentPage })));
// const DesignationSubmitPage = React.lazy(() => import('./Masters/DesignationNew').then(module => ({ default: module.DesignationSubmitPage })));
// const DesignationListPage = React.lazy(() => import('./Masters/DesignationNew').then(module => ({ default: module.DesignationListPage })));
// const EmployeeSubmitPage = React.lazy(() => import('./Masters/Employee').then(module => ({ default: module.EmployeeSubmitPage })));
// const ListEmployeeNew = React.lazy(() => import('./Masters/Employee').then(module => ({ default: module.ListEmployeeNew })));
// const Salary = React.lazy(() => import('./Masters/Salary/Salary'));
// const LeaveDashboard = React.lazy(() => import('./Pages/Leave/leavedashboard'));

// const EmployeeDetailPage = React.lazy(() => import('./Pages/Employee/ViewEmployee'));
// const ChangePasswordModal = React.lazy(() => import('./Pages/ChangePassword'));
// const StatsPanel = React.lazy(() => import('./Pages/Attendence/Attendence'));
// const LeaveForm = React.lazy(() => import('./Pages/Leave/LeaveForm'));
// const Setting = React.lazy(() => import('./Pages/Setting'));
// const SalaryMasterPage = React.lazy(() => import('./Masters/Salary/SalaryNew'));
// const RoleSubmitForm = React.lazy(() => import('./Masters/RoleSubmitForm'));
// const ListRole = React.lazy(() => import('./Masters/ListRole'));
 
// function App() {
//   const employee = {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     position: "Software Developer",
//     department: "Engineering",
//   };

//   return (
//     <>
//     <ErrorBoundary>

    
//       <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/default" element={<DefaultPage />} />

//           <Route path="/dashboard" element={<LayOut />}>
//             <Route index element={<AdminSummary />} />
//             <Route path="change-password" element={<ChangePasswordModal />} />

//              <Route path="role/submit" element={<RoleSubmitForm   />} />
//             <Route path="role/submit/:id" element={<RoleSubmitForm mode="edit" />} />
//             <Route path="list-role" element={<ListRole />} />

//             <Route path="save/department" element={<DepartmentPage  />} />
//             <Route path="edit-department/:id" element={<DepartmentPage mode="edit" />} />
//             <Route path="list-department" element={<DepartmentList />} />

//             <Route path="save/designation" element={<DesignationSubmitPage   />} />
//             <Route path="edit-designation/:id" element={<DesignationSubmitPage mode="edit" />} />
//             <Route path="list-designation" element={<DesignationListPage />} />

//             <Route path="salary" element={<Salary />} />
//             <Route path="leave/leavedashboard" element={<LeaveDashboard />} />

//             {/* Employee Routes */}
//             <Route path="list-employee" element={<ListEmployeeNew />} />
//             <Route path="save/employee" element={<EmployeeSubmitPage />} />
//             <Route path="edit-employee/:id" element={<EmployeeSubmitPage mode="edit" />} />
//             <Route path="employees/my-profile" element={<EmployeeDetailPage employee={employee} />} />

//             {/* Attendance Routes */}
//             <Route path="attendence" element={<StatsPanel />} />

//             {/* Leave Routes */}
//             <Route path="leaves/apply-leave" element={<LeaveForm />} />

//             <Route path="setting" element={<Setting />} />
//             <Route path="salarynew" element={<SalaryMasterPage />} />
//             {/* <Route path="role/assign-role" element={<AssignRole />} /> */}
//           </Route>
//         </Routes>
//       </Suspense>
//       </ErrorBoundary>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./ErrorBoundary";
import LayOut from './LayOut/LayOut';
import LoginPage from './Pages/login';
import AdminSummary from './Dashboard/AdminSummary';
import {DepartmentList ,DepartmentPage } from './Masters/Department';
//import DepartmentPage from './Masters/Department';
import {DesignationSubmitPage, DesignationListPage} from './Masters/Designation';
import {EmployeeSubmitPage ,ListEmployeeNew} from './Masters/Employee';
 import Salary from './Masters/Salary';
import LeaveDashboard from './Pages/Leave/leavedashboard';
import ChangePasswordModal from './Pages/ChangePassword';
import LeaveForm from './Pages/Leave/LeaveForm';
import Setting from './Pages/Setting';
import SalaryMasterPage from './Masters/SalaryNew';
import {RoleSubmitForm,ListRole} from './Masters/Role';
import AttendancePage from './Pages/Attendence'; 
import DocumentUpload from './Pages/DocumentUpload';


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
      {/* <ErrorBoundary> */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/dashboard" element={<LayOut />}>
            <Route index element={<AdminSummary />} />
            <Route path="change-password" element={<ChangePasswordModal />} />

            <Route path="role/submit" element={<RoleSubmitForm />} />
            <Route path="role/submit/:id" element={<RoleSubmitForm mode="edit" />} />
            <Route path="list-role" element={<ListRole />} />

            <Route path="save/department" element={<DepartmentPage />} />
            <Route path="edit-department/:id" element={<DepartmentPage mode="edit" />} />
            <Route path="list-department" element={<DepartmentList />} />

            <Route path="save/designation" element={<DesignationSubmitPage />} />
            <Route path="edit-designation/:id" element={<DesignationSubmitPage mode="edit" />} />
            <Route path="list-designation" element={<DesignationListPage />} />

            <Route path="salary" element={<Salary />} />
            <Route path="leave/leavedashboard" element={<LeaveDashboard />} />

            <Route path="list-employee" element={<ListEmployeeNew />} />
            <Route path="save/employee" element={<EmployeeSubmitPage />} />
            <Route path="edit-employee/:id" element={<EmployeeSubmitPage mode="edit" />} />

            <Route path="attendence" element={<AttendancePage />} />
            <Route path="leaves/apply-leave" element={<LeaveForm />} />
            <Route path="setting" element={<Setting />} />
            <Route path="salarynew" element={<SalaryMasterPage />} />

                        <Route path="document" element={<DocumentUpload />} />

          </Route>
        </Routes>
      {/* </ErrorBoundary> */}
      <ToastContainer />
    </>
  );
}

export default App;
