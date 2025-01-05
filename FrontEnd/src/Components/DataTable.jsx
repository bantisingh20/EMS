import React, { useState } from 'react';
import { useTable } from 'react-table';

const DataTable = ({ columns, data }) => {
  // State for column visibility
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce((acc, column) => {
      acc[column.field] = true; // Initially, all columns are visible
      return acc;
    }, {})
  );

  // Toggle column visibility
  const toggleColumnVisibility = (field) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Convert columns to fit react-table format (Header and accessor)
  const reactTableColumns = React.useMemo(
    () =>
      columns.map((column) => ({
        Header: column.headerName,
        accessor: column.field, // This should be passed as the accessor for react-table
      })),
    [columns]
  );

  // Use the table hooks from react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: reactTableColumns.filter((column) => columnVisibility[column.accessor]), // Only include visible columns
    data,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Dynamic Data Table</h2>
        <div className="mt-2">
          {/* Checkboxes for each column */}
          {columns.map((column) => (
            <label key={column.field} className="mr-4">
              <input
                type="checkbox"
                checked={columnVisibility[column.field]}
                onChange={() => toggleColumnVisibility(column.field)}
              />
              {column.headerName}
            </label>
          ))}
        </div>
      </div>

      {/* Table */}
      <table {...getTableProps()} className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-4 py-2 border">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Example Usage of the DataTable Component
const App = () => {
  // Sample data
  const data = [
    { id: 1, name: 'John', age: 28, city: 'New York' },
    { id: 2, name: 'Jane', age: 34, city: 'Los Angeles' },
    { id: 3, name: 'Mike', age: 22, city: 'Chicago' },
  ];

  // Sample columns configuration
  const columns = [
    { field: 'id', headerName: 'Sr.No' },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
    { field: 'city', headerName: 'City' },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default DataTable;
