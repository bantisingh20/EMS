import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon, FolderIcon,
} from '@heroicons/react/24/outline';
import { useAppContext } from '../Context/AppSessionContext';

const SideBar = () => {

  const {currentModule} = useAppContext();
  console.log(currentModule);
  const [isOpen, setIsOpen] = useState(false);
 

  const [menuItems, setMenuItems] = useState([
    // Administration Module
    {
      link: '/dashboard',
      icon: <ChartBarIcon className="h-5 w-5" />,
      label: 'Dashboard',
      moduleId: 1
    },
    {
      link: 'list-role',
      icon: <UsersIcon className="h-5 w-5" />,
      label: 'Roles',
      moduleId: 1
    },
    {
      link: 'list-department',
      icon: <BuildingOffice2Icon className="h-5 w-5" />,
      label: 'Department',
      moduleId: 1
    },
    {
      link: 'list-designation',
      icon: <BuildingOffice2Icon className="h-5 w-5" />,
      label: 'Designation',
      moduleId: 1
    },
    {
      link: 'list-employee',
      icon: <UsersIcon className="h-5 w-5" />,
      label: 'Employees',
      moduleId: 1
    },

    // Attendance / Leave Management Module
    {
      link: 'leave/leavedashboard',
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      label: 'Leave',
      moduleId: 2
    },
    {
      link: 'leave/leavedashboard',
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      label: 'Reports',
      moduleId: 2
    },
    {
      link: 'attendence',
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      label: 'Attendance',
      moduleId: 3
    },

    // Document Management Module
    {
      link: 'document',
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      label: 'Document',
      moduleId: 4
    },

    // Task Management Module
    {
      link: 'Tasks Management',
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      label: 'Tasks Management',
      expanded: true,
      moduleId: 5,
      children: [
        {
          label: 'Master',
          link: 'Master',
          icon: <CalendarDaysIcon className="h-5 w-5" />,
          moduleId: 5,
          expanded: true,
          children: [
            { label: 'Priority', link: '/tasks/master/priority' },
            { label: 'Task Status', link: '/tasks/master/status' }
          ]
        },
        { label: 'Add Tasks', link: '/tasks/add' }
      ]
    },

    // Salary Module
    {
      link: 'salary-overview',
      icon: <ChartBarIcon className="h-5 w-5" />,
      label: 'Salary Overview',
      moduleId: 6
    },
    {
      link: 'payslips',
      icon: <UsersIcon className="h-5 w-5" />,
      label: 'Payslips',
      moduleId: 'salary'
    },
    {
      link: 'tax-details',
      icon: <UsersIcon className="h-5 w-5" />,
      label: 'Tax Details',
      moduleId: 'salary'
    },

    // Report Module
    {
      link: 'Report',
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      label: 'Report',
      expanded: false,
      moduleId: 7,
      children: [
        { label: 'Daily Report', link: '/reports/daily' },
        { label: 'Monthly Report', link: '/reports/monthly' }
      ]
    },

    // Trends Module
    {
      link: 'employee-trends',
      icon: <ChartBarIcon className="h-5 w-5" />,
      label: 'Employee Trends',
      moduleId: 8
    },
    {
      link: 'attendance-trends',
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      label: 'Attendance Trends',
      moduleId: 'trends'
    },
    {
      link: 'leave-trends',
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      label: 'Leave Trends',
      moduleId: 'trends'
    }
  ]);


  const toggleSidebar = () => setIsOpen(!isOpen);

  // Update the toggleExpand function to handle deep nesting
  const toggleExpand = (index, childIndex = null) => {
    setMenuItems((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          if (childIndex !== null && item.children) {
            return {
              ...item,
              children: item.children.map((child, ci) =>
                ci === childIndex ? { ...child, expanded: !child.expanded } : child
              ),
            };
          }
          return { ...item, expanded: !item.expanded };
        }
        return item;
      })
    );
  };

  const filteredMenuItems = menuItems.filter(item => item.moduleId === currentModule);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`fixed top-2 ${isOpen ? 'left-44' : 'left-4'} z-50 text-white bg-teal-700 p-2 rounded-md md:hidden`}
      >
        {isOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 h-screen bg-teal-800 text-white transition-transform duration-300 ease-in-out shadow-lg
  ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-teal-900`}
      >

        <div className="px-6 py-4 text-xl md:text-2xl font-bold border-b border-teal-700">EMS</div>

        <nav className="mt-4 text-sm sm:text-base">
          <ul className="space-y-1">
            {filteredMenuItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                index={index}
                toggleExpand={toggleExpand}
                isExpanded={item.expanded}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

// Recursive MenuItem component to handle deep nesting
const MenuItem = ({ item, index, toggleExpand, isExpanded, parentIndex = null, childIndex = null }) => {
  return (
    <li>
      {!item.children ? (
        <NavLink
          to={item.link}
          className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-3 rounded-lg transition hover:bg-teal-700
             ${isActive ? 'bg-teal-700 font-semibold' : ''}`
          }
        >
          <span className="text-base text-teal-200"> {item.icon || <FolderIcon className="h-5 w-5" />} </span>
          <span>{item.label}</span>
        </NavLink>
      ) : (
        <>
          <button
            onClick={() => toggleExpand(index, childIndex)} // Pass both parent and child index
            className="w-full flex items-center justify-between px-5 py-3 rounded-lg text-left transition hover:bg-teal-700"
          >
            <span className="flex items-center gap-3">
              <span className="text-base text-teal-200"> {item.icon || <FolderIcon className="h-5 w-5" />} </span>
              {item.label}
            </span>
            <ChevronRightIcon
              className={`w-4 h-4 text-teal-200 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
          {isExpanded && item.children && (
            <ul className="ml-8 mt-1 space-y-1">
              {item.children.map((subItem, subIndex) => (
                <MenuItem
                  key={subIndex}
                  item={subItem}
                  index={index} // Pass the parent index for nested items
                  childIndex={subIndex} // Pass the child index for sub-items
                  toggleExpand={toggleExpand} // The function to toggle expansion
                  isExpanded={subItem.expanded} // Expansion state for the child
                />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
};

export default SideBar;
