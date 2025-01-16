import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
  const [selectedRole, setSelectedRole] = useState('user');
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const apiData = [
    { menuId: 1, menuName: "Dashboard", navigateUrl: "/dashboard" },
    { menuId: 2, menuName: "Settings", navigateUrl: "/settings" },
    { menuId: 3, menuName: "Profile", navigateUrl: "/profile" },
    { menuId: 4, menuName: "Messages", navigateUrl: "/messages" }
  ];

  useEffect(()=>{
    const fetchMenus = async () => {
        try {
          const response = await fetch(`/Role/Assign-Role-To-Employee`);
          const data = await response.json();
          setMenus(data);
        } catch (err) {
          console.error('Error fetching menus:', err);
        }
      };
  
      fetchMenus();
  },[])

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleCheckboxChange = (menuId) => {
    setSelectedMenus((prevMenus) => {
      if (prevMenus.includes(menuId)) {
        return prevMenus.filter((id) => id !== menuId);
      } else {
        return [...prevMenus, menuId];
      }
    });
  };

  const handleSave = () => {
    console.log("Selected Role:", selectedRole);
    console.log("Selected Menus:", selectedMenus);
    alert('Data Saved Successfully!');
  };

  return (
    <div className="flex p-6 space-x-6">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Sidebar Menu</h2>
        
        {/* Dropdown for User Role */}
        <div className="mb-6">
          <label htmlFor="userRole" className="block text-sm font-medium mb-2">Select User Role:</label>
          <select
            id="userRole"
            value={selectedRole}
            onChange={handleRoleChange}
            className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full mt-6 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Main Content Area</h2>

        {/* Display the selected menus dynamically */}
        <div className="mt-4">
          {/* Menu items with checkboxes */}
        <div className="space-y-4">
          {apiData.map((menu) => (
            <div key={menu.menuId} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`menu-${menu.menuId}`}
                value={menu.menuId}
                checked={selectedMenus.includes(menu.menuId)}
                onChange={() => handleCheckboxChange(menu.menuId)}
                className="h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor={`menu-${menu.menuId}`} className="text-sm font-medium">{menu.menuName}</label>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
