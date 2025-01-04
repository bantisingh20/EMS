import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const EmployeeDetailPage = ({ employee }) => {
  const printRef = useRef();

  // Function to trigger print
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Function to export data to CSV (For single employee data)
  const handleExport = () => {
    const csvData = [
      ["ID", "Name", "Email", "Position", "Department"].join(","),
      [
        employee.id,
        employee.name,
        employee.email,
        employee.position,
        employee.department,
      ].join(","),
    ].join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${employee.name}_details.csv`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="mb-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 mr-2"
        >
          Print
        </button>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Export to CSV
        </button>
      </div>

      {/* Printable section */}
      <div ref={printRef} className="bg-white shadow-lg rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">ID: {employee.id}</h2>
          </div>
          <div>
            <h3 className="text-lg font-medium">Name:</h3>
            <p>{employee.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Email:</h3>
            <p>{employee.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Position:</h3>
            <p>{employee.position}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Department:</h3>
            <p>{employee.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
