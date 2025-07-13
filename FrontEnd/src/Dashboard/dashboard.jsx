import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  IconButton,
  Badge,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  AccessTime as AccessTimeIcon,
  Event as EventIcon,
  AttachMoney as AttachMoneyIcon,
  Description as DescriptionIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'employees', label: 'Employees', icon: <PeopleIcon /> },
    { id: 'departments', label: 'Departments', icon: <BusinessIcon /> },
    { id: 'roles', label: 'Roles & Designations', icon: <WorkIcon /> },
    { id: 'attendance', label: 'Attendance', icon: <AccessTimeIcon /> },
    { id: 'leaves', label: 'Leave Management', icon: <EventIcon /> },
    { id: 'salary', label: 'Salary', icon: <AttachMoneyIcon /> },
    { id: 'documents', label: 'Documents', icon: <DescriptionIcon /> },
  ];

  const stats = [
    { title: 'Total Employees', value: '248', change: '+12%', color: 'bg-blue-500' },
    { title: 'Present Today', value: '232', change: '93.5%', color: 'bg-green-500' },
    { title: 'On Leave', value: '12', change: '-2%', color: 'bg-yellow-500' },
    { title: 'Pending Requests', value: '8', change: '+3', color: 'bg-red-500' },
  ];

  const recentEmployees = [
    { id: 1, name: 'John Doe', department: 'IT', designation: 'Software Engineer', status: 'Active', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', department: 'HR', designation: 'HR Manager', status: 'Active', avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', department: 'Finance', designation: 'Accountant', status: 'On Leave', avatar: 'MJ' },
    { id: 4, name: 'Sarah Wilson', department: 'Marketing', designation: 'Marketing Specialist', status: 'Active', avatar: 'SW' },
    { id: 5, name: 'David Brown', department: 'IT', designation: 'DevOps Engineer', status: 'Active', avatar: 'DB' },
  ];

  const leaveRequests = [
    { id: 1, employee: 'Alice Cooper', type: 'Sick Leave', days: 2, status: 'Pending' },
    { id: 2, employee: 'Bob Martin', type: 'Vacation', days: 5, status: 'Approved' },
    { id: 3, employee: 'Carol White', type: 'Personal', days: 1, status: 'Pending' },
    { id: 4, employee: 'Tom Hardy', type: 'Sick Leave', days: 3, status: 'Rejected' },
  ];

  const attendanceData = [
    { department: 'IT', present: 45, total: 50, percentage: 90 },
    { department: 'HR', present: 18, total: 20, percentage: 90 },
    { department: 'Finance', present: 22, total: 25, percentage: 88 },
    { department: 'Marketing', present: 15, total: 18, percentage: 83 },
    { department: 'Operations', present: 28, total: 30, percentage: 93 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Leave': return 'warning';
      case 'Inactive': return 'error';
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const renderDashboard = () => (
    <div className="p-6">
      <div className="mb-6">
        <Typography variant="h4" className="font-bold text-gray-800 mb-2">
          Employee Management Dashboard
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600">
          Welcome back! Here's what's happening with your team today.
        </Typography>
      </div>

      {/* Stats Cards */}
      <Grid container spacing={3} className="mb-6">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="h-full">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="font-bold text-gray-800">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {stat.title}
                    </Typography>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                    <div className="w-6 h-6 bg-white rounded-full opacity-30"></div>
                  </div>
                </div>
                <div className="mt-2">
                  <Typography variant="caption" className="text-green-600 font-medium">
                    {stat.change}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500 ml-1">
                    vs last month
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Employees */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-semibold">
                  Recent Employees
                </Typography>
                <IconButton size="small" className="text-blue-600">
                  <AddIcon />
                </IconButton>
              </div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8 bg-blue-600">
                              {employee.avatar}
                            </Avatar>
                            <Typography variant="body2" className="font-medium">
                              {employee.name}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.designation}</TableCell>
                        <TableCell>
                          <Chip
                            label={employee.status}
                            color={getStatusColor(employee.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" className="text-blue-600">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" className="text-red-600">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Requests */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-semibold">
                  Leave Requests
                </Typography>
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon className="text-gray-600" />
                </Badge>
              </div>
              <div className="space-y-3">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <Typography variant="body2" className="font-medium">
                        {request.employee}
                      </Typography>
                      <Typography variant="caption" className="text-gray-600">
                        {request.type} • {request.days} days
                      </Typography>
                    </div>
                    <Chip
                      label={request.status}
                      color={getStatusColor(request.status)}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance Overview */}
      <Grid container spacing={3} className="mt-6">
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Department-wise Attendance
              </Typography>
              <div className="space-y-4">
                {attendanceData.map((dept) => (
                  <div key={dept.department} className="flex items-center gap-4">
                    <div className="w-24">
                      <Typography variant="body2" className="font-medium">
                        {dept.department}
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <LinearProgress
                        variant="determinate"
                        value={dept.percentage}
                        className="h-2 rounded-full"
                      />
                    </div>
                    <div className="w-20 text-right">
                      <Typography variant="body2" className="font-medium">
                        {dept.present}/{dept.total}
                      </Typography>
                    </div>
                    <div className="w-12 text-right">
                      <Typography variant="caption" className="text-gray-600">
                        {dept.percentage}%
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'employees':
        return (
          <div className="p-6">
            <Typography variant="h5" className="font-bold mb-4">Employee Management</Typography>
            <Typography variant="body1">Employee management features will be implemented here.</Typography>
          </div>
        );
      case 'departments':
        return (
          <div className="p-6">
            <Typography variant="h5" className="font-bold mb-4">Department Management</Typography>
            <Typography variant="body1">Department management features will be implemented here.</Typography>
          </div>
        );
      case 'roles':
        return (
          <div className="p-6">
            <Typography variant="h5" className="font-bold mb-4">Roles & Designations</Typography>
            <Typography variant="body1">Role and designation management features will be implemented here.</Typography>
          </div>
        );
      case 'attendance':
        return (
          <div className="p-6">
            <Typography variant="h5" className="font-bold mb-4">Attendance Management</Typography>
            <Typography variant="body1">Attendance tracking features will be implemented here.</Typography>
          </div>
        );
      case 'leaves':
        return (
          <div className="p-6">
            <Typography variant="h5" className="font-bold mb-4">Leave Management</Typography>
            <Typography variant="body1">Leave management features will be implemented here.</Typography>
          </div>
        );
      case 'salary':
        return (
          <div className="p-6">
            <Typography variant="h5" className="font-bold mb-4">Salary Management</Typography>
            <Typography variant="body1">Salary management features will be implemented here.</Typography>
          </div>
        );
      case 'documents':
        return (
          <div className="p-6">
            <Typography variant="h5" className="font-bold mb-4">Document Management</Typography>
            <Typography variant="body1">Document management features will be implemented here.</Typography>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} className="bg-white shadow-sm">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" className="text-gray-800 font-bold">
            Employee Management System
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton className="text-gray-600">
            <SearchIcon />
          </IconButton>
          <IconButton className="text-gray-600">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className="text-gray-600">
            <SettingsIcon />
          </IconButton>
          <Avatar className="ml-2 bg-blue-600">A</Avatar>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        className="bg-gray-50"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`mx-2 mb-1 rounded-lg ${
                  activeSection === item.id 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ListItemIcon className={activeSection === item.id ? 'text-blue-700' : 'text-gray-500'}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  className={activeSection === item.id ? 'font-medium' : ''}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Dashboard;