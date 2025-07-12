// src/pages/common/MasterDataGridPage.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../Pages/Common';

const currentUser = { role: 'admin' }; // Replace with real auth

const MasterDataGridPage = ({ config }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await config.fetchFunction();
      setRows(res.success ? res.data : []);
    } catch (err) {
      handleError('Fetch failed');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Confirm delete?')) return;
    try {
      const res = await config.deleteFunction(id);
      if (res.success) {
        handleSuccess('Deleted');
        fetchData();
      } else {
        handleError('Delete failed');
      }
    } catch {
      handleError('Delete error');
    }
  };

  const filteredRows = rows.filter((row) =>
    config.searchKeys.some((key) =>
      String(row[key]).toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = useMemo(() => {
    const base = [
      { field: 'id', headerName: 'Sr.No', width: 80, valueGetter: (params) => params.api.getRowIndex(params.id) + 1 },
      ...config.columns,
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        sortable: false,
        renderCell: (params) => (
          <div style={{ display: 'flex', gap: 8 }}>
            {config.actionButtons
              .filter((btn) => !btn.condition || btn.condition(currentUser, params.row))
              .map((btn, idx) => {
                if (btn.type === 'edit') {
                  return (
                    <Button key={idx} variant="contained" size="small" onClick={() => navigate(`${config.editUrlBase}/${params.row._id}`)}>
                      {btn.label}
                    </Button>
                  );
                }
                if (btn.type === 'delete') {
                  return (
                    <Button key={idx} variant="contained" color="error" size="small" onClick={() => handleDelete(params.row._id)}>
                      {btn.label}
                    </Button>
                  );
                }
                return null;
              })}
          </div>
        ),
      },
    ];
    return base;
  }, [config, navigate]);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3>{config.title}</h3>
        <Button variant="contained" onClick={() => navigate(config.addUrl)}>
          {config.addLabel}
        </Button>
      </div>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 8, padding: 4, width: 200 }}
      />
      <DataGrid
        columns={columns}
        rows={filteredRows.map((r) => ({ ...r, id: r._id }))}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default MasterDataGridPage;
