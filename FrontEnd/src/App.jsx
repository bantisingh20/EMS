// import React from "react";
// import LoginPage from "./Pages/login";
// import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
// import DefaultPage from "./Pages/default"; 
// import AdminSummary from "./Dashboard/AdminSummary";
// import  { DepartmentList,DepartmentPage } from './Masters/Department'
// import LayOut from './LayOut/LayOut';
// import Salary from './Masters/Salary/Salary'
// import Setting from './Pages/Setting' 
// import { ToastContainer } from "react-toastify";
// import EmployeeDetailPage from "./Pages/Employee/ViewEmployee";
// import SalaryMasterPage from "./Masters/Salary/SalaryNew";
// import ChangePasswordModal from "./Pages/ChangePassword";
// import LeaveDashboard from "./Pages/Leave/leavedashboard";
// import LeaveForm from "./Pages/Leave/LeaveForm";
// import EmployeeProfile from "./Pages/Attendence/Attendence";
// import {DesignationSubmitPage,DesignationListPage } from './Masters/DesignationNew'
// import { EmployeeSubmitPage,ListEmployeeNew } from "./Masters/Employee";
// import 'react-toastify/dist/ReactToastify.css'; 
// import AssignRole from "./Masters/AssignRole";
 

// function App1() {
   
//   const employee = {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     position: "Software Developer",
//     department: "Engineering",
//   };

//   return (
//      <>
//       <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />}></Route>
//           <Route path="/login" element={<LoginPage />} ></Route>
//           <Route path="/default" element={<DefaultPage />} ></Route>
          
//           <Route path="/dashboard" element={<LayOut />} >{/* parent */}
//              <Route index element={<AdminSummary />}></Route>
//              <Route path="change-password" element={<ChangePasswordModal />} ></Route>
//              <Route path="save/department" element={<DepartmentPage mode="new" />} ></Route>
//              <Route path="edit-department/:id" element={<DepartmentPage mode="edit" />} />
//              <Route path="list-department" element={<DepartmentList />} ></Route>

//              <Route path="save/designation" element={<DesignationSubmitPage mode="new" />} ></Route>
//              <Route path="edit-designation/:id" element={<DesignationSubmitPage mode="edit" />} />
//              <Route path="list-designation" element={<DesignationListPage />} ></Route>
 
//              <Route path="salary" element={<Salary />} ></Route>
//              <Route path="leave/leavedashboard" element={<LeaveDashboard />} ></Route>
                              
 
//               <Route path="list-EmployeeSubmitPage" element={<EmployeeSubmitPage />} ></Route> 
//               <Route path="list-employees" element={<ListEmployeeNew />} ></Route>     
//               <Route path="edit-EmployeeSubmitPage/:id" element={<EmployeeSubmitPage />} ></Route>              
//               <Route path="employees/my-[profile" element={<EmployeeDetailPage employee={employee}/>} ></Route>                          
              
 
//               <Route path="Attendence" element={<EmployeeProfile />} ></Route>
              
//               <Route path="leaves/apply-leave" element={<LeaveForm />}></Route>
//               <Route path="setting" element={<Setting />} ></Route>
             
//               <Route path="salarynew" element={<SalaryMasterPage />} ></Route>
//               <Route path="Role/Assign-Role-To-Employee" element={<AssignRole />} ></Route>
//           </Route>
          
//       </Routes>
//      <ToastContainer />
//      </>
     
 
 
     
//   );

// }

// export default App

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import SkeletonLoader from "./Components/LazyLoading";

// Lazy-loaded components
const LoginPage = React.lazy(() => import('./Pages/login'));
const DefaultPage = React.lazy(() => import('./Pages/default'));
const AdminSummary = React.lazy(() => import('./Dashboard/AdminSummary'));
const LayOut = React.lazy(() => import('./LayOut/LayOut'));
const DepartmentList = React.lazy(() => import('./Masters/Department').then(module => ({ default: module.DepartmentList })));
const DepartmentPage = React.lazy(() => import('./Masters/Department').then(module => ({ default: module.DepartmentPage })));
const DesignationSubmitPage = React.lazy(() => import('./Masters/DesignationNew').then(module => ({ default: module.DesignationSubmitPage })));
const DesignationListPage = React.lazy(() => import('./Masters/DesignationNew').then(module => ({ default: module.DesignationListPage })));
const EmployeeSubmitPage = React.lazy(() => import('./Masters/Employee').then(module => ({ default: module.EmployeeSubmitPage })));
const ListEmployeeNew = React.lazy(() => import('./Masters/Employee').then(module => ({ default: module.ListEmployeeNew })));
const Salary = React.lazy(() => import('./Masters/Salary/Salary'));
const LeaveDashboard = React.lazy(() => import('./Pages/Leave/leavedashboard'));

const EmployeeDetailPage = React.lazy(() => import('./Pages/Employee/ViewEmployee'));
const ChangePasswordModal = React.lazy(() => import('./Pages/ChangePassword'));
const StatsPanel = React.lazy(() => import('./Pages/Attendence/Attendence'));
const LeaveForm = React.lazy(() => import('./Pages/Leave/LeaveForm'));
const Setting = React.lazy(() => import('./Pages/Setting'));
const SalaryMasterPage = React.lazy(() => import('./Masters/Salary/SalaryNew'));
const RoleSubmitForm = React.lazy(() => import('./Masters/RoleSubmitForm'));
const ListRole = React.lazy(() => import('./Masters/ListRole'));
 
// const RoleSubmitForm = React.lazy(() => import('./Masters/Role').then(module => ({ default: module.RoleSubmitForm })));
// const ListRole = React.lazy(() => import('./Masters/Role').then(module => ({ default: module.ListRole })));

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
    <ErrorBoundary>

    
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/default" element={<DefaultPage />} />

          <Route path="/dashboard" element={<LayOut />}>
            <Route index element={<AdminSummary />} />
            <Route path="change-password" element={<ChangePasswordModal />} />

             <Route path="role/submit" element={<RoleSubmitForm   />} />
            <Route path="role/submit/:id" element={<RoleSubmitForm mode="edit" />} />
            <Route path="list-role" element={<ListRole />} />

            <Route path="save/department" element={<DepartmentPage  />} />
            <Route path="edit-department/:id" element={<DepartmentPage mode="edit" />} />
            <Route path="list-department" element={<DepartmentList />} />

            <Route path="save/designation" element={<DesignationSubmitPage   />} />
            <Route path="edit-designation/:id" element={<DesignationSubmitPage mode="edit" />} />
            <Route path="list-designation" element={<DesignationListPage />} />

            <Route path="salary" element={<Salary />} />
            <Route path="leave/leavedashboard" element={<LeaveDashboard />} />

            {/* Employee Routes */}
            <Route path="list-employees" element={<ListEmployeeNew />} />
            <Route path="list-EmployeeSubmitPage" element={<EmployeeSubmitPage />} />
            <Route path="edit-EmployeeSubmitPage/:id" element={<EmployeeSubmitPage />} />
            <Route path="employees/my-profile" element={<EmployeeDetailPage employee={employee} />} />

            {/* Attendance Routes */}
            <Route path="attendence" element={<StatsPanel />} />

            {/* Leave Routes */}
            <Route path="leaves/apply-leave" element={<LeaveForm />} />

            <Route path="setting" element={<Setting />} />
            <Route path="salarynew" element={<SalaryMasterPage />} />
            {/* <Route path="role/assign-role" element={<AssignRole />} /> */}
          </Route>
        </Routes>
      </Suspense>
      </ErrorBoundary>
      <ToastContainer />
    </>
  );
}

export default App;
