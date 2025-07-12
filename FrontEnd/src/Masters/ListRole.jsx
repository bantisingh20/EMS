import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { GetAllRoles, DeleteRoleById } from '../api/RoleService'; 
import { AppDataGrid } from '../Pages/Common';
import { useNavigate } from 'react-router-dom';
import RoleFormConfig, { RoleListConfig } from '../config/role.config';
import MasterDataGridPage from './MasterListPage';

const ListRoleold = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [pending, setPending] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchRoles = async () => {
        setPending(true);
        try {
            const response = await GetAllRoles();
            setRoles(response.success ? response.data : []);
        } catch (error) {
            console.error('Error fetching roles', error);
        }
        setPending(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                await DeleteRoleById(id);
                fetchRoles();
            } catch (error) {
                console.error('Delete failed', error);
            }
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const columns = [
        { field: 'id', headerName: 'Sr.No', width: 80 },
        { field: 'name', headerName: 'Role Name', flex: 1, width: 80 },
        {
            field: 'actions',
            headerName: 'Action',
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button
                        variant="contained"
                        color="info"
                        size="small"
                        sx={{ minWidth: 60, padding: '4px 8px', fontSize: '0.7rem' }}
                        onClick={() => navigate(`/dashboard/role/submit/${params.row._id}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ minWidth: 60, padding: '4px 8px', fontSize: '0.7rem' }}
                        onClick={() => handleDelete(params.row._id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
            sortable: false,
            width: 150,
        },
    ];

    return (
        <div
            className="bg-white p-4 rounded-md shadow-md"
            style={{ maxWidth: 900, margin: 'auto' }}
        >


            <div style={{ width: '100%' }}>


                <AppDataGrid
                    columns={columns}
                    data={roles.map((role) => ({ ...role, id: role._id }))}
                    heading="Manage Roles"
                    loading={pending}
                    showHeaderButton={true}
                    headerButtonProps={{
                        label: 'Add New Role',
                        onClick: () => {
                            navigate(`/dashboard/role/submit`)
                        }
                    }}
                />

            </div>


        </div>
    );
};

const ListRole = () => <MasterDataGridPage config={RoleListConfig} />;

export default ListRole;
