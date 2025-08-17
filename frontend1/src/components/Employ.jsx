import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import API from '../services/api';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/y3grlD0Xm4c-f1R8j2nJ7w.ttf',
});


const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: 'Oswald',
    fontSize: 12,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderColor: '#bfbfbf',
    padding: 5,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderColor: '#bfbfbf',
    padding: 5,
    textAlign: 'center',
  },
  statusActive: {
    color: 'green',
    fontWeight: 'bold',
  },
  statusInactive: {
    color: 'red',
    fontWeight: 'bold',
  },
});


const StyledDataTable = styled(DataTable)`
  .rdt_Table {
    border-radius: 8px;
    overflow: hidden;
  }
  .rdt_TableHead {
    background-color: #f8f9fa;
    border-bottom: 2px solid #e2e8f0;
    font-weight: 600;
  }
  .rdt_TableCol {
    padding: 1rem;
    font-size: 0.875rem;
    color: #4a5568;
  }
  .rdt_TableCell {
    padding: 1rem;
    font-size: 0.875rem;
  }
  .rdt_TableRow {
    border-bottom: 1px solid #e2e8f0;
    &:hover {
      background-color: #f7fafc;
    }
  }
`;


const EmployeePDF = ({ employees }) => (




  <Document>
    <Page style={pdfStyles.page}>
      <Text style={pdfStyles.heading}>Employee List</Text>
      <View style={pdfStyles.table}>
        {/* Table Header */}
        <View style={pdfStyles.tableRow}>
          <Text style={pdfStyles.tableColHeader}>Name</Text>
          <Text style={pdfStyles.tableColHeader}>Email</Text>
          <Text style={pdfStyles.tableColHeader}>Role</Text>
          <Text style={pdfStyles.tableColHeader}>Department</Text>
          <Text style={pdfStyles.tableColHeader}>Status</Text>
        </View>
        {/* Table Content */}
        {employees.map((employee, index) => (
          <View style={pdfStyles.tableRow} key={index}>
            <Text style={pdfStyles.tableCol}>{employee.name}</Text>
            <Text style={pdfStyles.tableCol}>{employee.email}</Text>
            <Text style={pdfStyles.tableCol}>{employee.role}</Text>
            <Text style={pdfStyles.tableCol}>{employee.department}</Text>
            <Text
              style={
                employee.status === 'Active'
                  ? pdfStyles.statusActive
                  : pdfStyles.statusInactive
              }
            >
              {employee.status}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);



const Employ = () => {




  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        
        const response = await API.get("/employees");
        
        const formattedData = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          status: user.status,
        }));

        setEmployees(formattedData);
        setFilteredEmployees(formattedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please check the API endpoint.');
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []); 

  
  useEffect(() => {
    const filtered = employees.filter((item) => {
      const lowercasedFilterText = filterText.toLowerCase();

      const nameMatch = item.name.toLowerCase().includes(lowercasedFilterText);
      const roleMatch = item.role.toLowerCase().includes(lowercasedFilterText);
      const departmentMatch = item.department
        .toLowerCase()
        .includes(lowercasedFilterText);

      if (filterCategory === 'all') {
        return nameMatch || roleMatch || departmentMatch;
      } else if (filterCategory === 'name') {
        return nameMatch;
      } else if (filterCategory === 'role') {
        return roleMatch;
      } else if (filterCategory === 'department') {
        return departmentMatch;
      }
      return false;
    });

    setFilteredEmployees(filtered);
  }, [filterText, filterCategory, employees]);

  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Email', selector: (row) => row.email },
    { name: 'Role', selector: (row) => row.role, sortable: true },
    { name: 'Department', selector: (row) => row.department },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: () => (
        <div className="flex space-x-2">

          <button className="text-gray-400 hover:text-green-500">
            {/*<FaEdit />*/}
          </button>
          <button className="text-gray-400 hover:text-red-500">
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];
  
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    csvRows.push(headers.join(","));

   
    data.forEach((row) => {
      const values = headers.map((header) => `${row[header] || ""}`);
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(employees);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "employees.csv"; 
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex">
      <div className='mr-30  bg-white'>
        <Sidebar />
      </div>

      <div className="p-8 mr-30 ml-30 bg-white min-h-screen">

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-blue-600 mr-20 mb-5">Employees</h1>
            <div className="flex items-center space-x-4">
              <Link to="/Ademp">
                <button className="flex items-center px-4 py-2 text-sm text-white w-50 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  <FaPlus className="mr-2" /> Add an employee
                </button>
              </Link>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search employees"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:border-gray-400 transition-colors"
              >
                <option value="all">Sort by: All</option>
                <option value="name">Name</option>
                <option value="role">Role</option>
                <option value="department">Department</option>
              </select>
              <button
                onClick={downloadCSV}
                className='w-25 mt-4 ml-5'
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "15px",
                }}
              >
                Export
              </button>
              {/* 
              <PDFDownloadLink
                document={<EmployeePDF employees={employees} />}
                fileName="employees.pdf"
              >
                {({ loading }) => (
                  <button
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    disabled={loading}
                  >
                    Export
                  </button>
                )}
              </PDFDownloadLink> */}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500">Loading employees...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">Error: {error}</div>
          ) : (
            <StyledDataTable
              columns={columns}
              data={filteredEmployees}
              pagination
              highlightOnHover
              pointerOnHover
              responsive
              noHeader
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Employ;


















/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

// Register font for PDF document
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/y3grlD0Xm4c-f1R8j2nJ7w.ttf',
});

// Create styles for the PDF document
const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: 'Oswald',
    fontSize: 12,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderColor: '#bfbfbf',
    padding: 5,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderColor: '#bfbfbf',
    padding: 5,
    textAlign: 'center',
  },
  statusActive: {
    color: 'green',
    fontWeight: 'bold',
  },
  statusInactive: {
    color: 'red',
    fontWeight: 'bold',
  },
});

// Styled component for the DataTable to match the screenshot's aesthetic
const StyledDataTable = styled(DataTable)`
  .rdt_Table {
    border-radius: 8px;
    overflow: hidden;
  }
  .rdt_TableHead {
    background-color: #f8f9fa;
    border-bottom: 2px solid #e2e8f0;
    font-weight: 600;
  }
  .rdt_TableCol {
    padding: 1rem;
    font-size: 0.875rem;
    color: #4a5568;
  }
  .rdt_TableCell {
    padding: 1rem;
    font-size: 0.875rem;
  }
  .rdt_TableRow {
    border-bottom: 1px solid #e2e8f0;
    &:hover {
      background-color: #f7fafc;
    }
  }
`;

// PDF Document component
const EmployeePDF = ({ employees }) => (
  <Document>
    <Page style={pdfStyles.page}>
      <Text style={pdfStyles.heading}>Employee List</Text>
      <View style={pdfStyles.table}>
        {/* Table Header }
        <View style={pdfStyles.tableRow}>
          <Text style={pdfStyles.tableColHeader}>Name</Text>
          <Text style={pdfStyles.tableColHeader}>Email</Text>
          <Text style={pdfStyles.tableColHeader}>Role</Text>
          <Text style={pdfStyles.tableColHeader}>Department</Text>
          <Text style={pdfStyles.tableColHeader}>Status</Text>
        </View>
        {/* Table Content }
        {employees.map((employee, index) => (
          <View style={pdfStyles.tableRow} key={index}>
            <Text style={pdfStyles.tableCol}>{employee.name}</Text>
            <Text style={pdfStyles.tableCol}>{employee.email}</Text>
            <Text style={pdfStyles.tableCol}>{employee.role}</Text>
            <Text style={pdfStyles.tableCol}>{employee.department}</Text>
            <Text
              style={
                employee.status === 'Active'
                  ? pdfStyles.statusActive
                  : pdfStyles.statusInactive
              }
            >
              {employee.status}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Main React component for the employee table
const EmployeesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const formattedData = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'Web Designer',
          department: 'Engineering',
          status: user.id % 2 === 0 ? 'Inactive' : 'Active',
        }));

        setEmployees(formattedData);
        setFilteredEmployees(formattedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please check the API endpoint.');
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees based on search text and category
  useEffect(() => {
    const filtered = employees.filter((item) => {
      const lowercasedFilterText = filterText.toLowerCase();

      const nameMatch = item.name.toLowerCase().includes(lowercasedFilterText);
      const roleMatch = item.role.toLowerCase().includes(lowercasedFilterText);
      const departmentMatch = item.department
        .toLowerCase()
        .includes(lowercasedFilterText);

      if (filterCategory === 'all') {
        return nameMatch || roleMatch || departmentMatch;
      } else if (filterCategory === 'name') {
        return nameMatch;
      } else if (filterCategory === 'role') {
        return roleMatch;
      } else if (filterCategory === 'department') {
        return departmentMatch;
      }
      return false;
    });

    setFilteredEmployees(filtered);
  }, [filterText, filterCategory, employees]);

  const columns = [
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Email', selector: (row) => row.email },
    { name: 'Role', selector: (row) => row.role, sortable: true },
    { name: 'Department', selector: (row) => row.department },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: () => (
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-green-500">
            <FaEdit />
          </button>
          <button className="text-gray-400 hover:text-red-500">
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Employees</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
              <FaPlus className="mr-2" /> Add an employee
            </button>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search employees"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:border-gray-400 transition-colors"
            >
              <option value="all">Sort by: All</option>
              <option value="name">Name</option>
              <option value="role">Role</option>
              <option value="department">Department</option>
            </select>
            <PDFDownloadLink
              document={<EmployeePDF employees={employees} />}
              fileName="employees.pdf"
            >
              {({ loading }) => (
                <button
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  disabled={loading}
                >
                  Export
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading employees...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        ) : (
          <StyledDataTable
            columns={columns}
            data={filteredEmployees}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noHeader
          />
        )}
      </div>
    </div>
  );
};

export default EmployeesTable;

*/




/*//import React from "react";
import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
/*
export default function Employ() {


  const [employees, setEmployees] = useState([]);

  const load = async () => {
    try {
      
      const list = await API.get("/employees");
      setEmployees(list.data);
    } catch(err){ console.error(err); }
  };
  
  useEffect(()=>{ load(); },[]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    await API.delete(`/employees/${id}`);
    setEmployees(prev => prev.filter(e=>e._id !== id));
  };


  return (
    <div className="flex">
      <Sidebar />
    <div className="bg-white p-6 ml-70 mt-20 rounded-xl shadow">
      
      <div className="flex  items-center mb-4">
        <h1 className="text-lg text-lg text-blue-300 font-semibold">Employees</h1>
       <Link to="/Ademp"><button className="bg-blue-500 ml-100 mt-10 text-white px-4 py-2 rounded">Add an  Employee</button></Link>
        <input placeholder="Search" className="border ml-50 mt-10 px-3 py-1 rounded text-sm" />
      </div>
      <div className="overflow-x-auto bg-white p-6 rounded-xl shadow">
        <table className="w-full text-left border-collapse border-gray-200">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-2 border-0">Name</th>
              <th className="p-2 border-0">Role</th>
              <th className="p-2 border-0">email</th>

              <th className="p-2 border-0">Dept</th>
              <th className="p-2 border-0">Tasks</th>
              <th className="p-2 border-0">Status</th>
              <th className="p-2 border-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id} className="border-0 hover:bg-gray-50">
                <td className="p-2 border-0">{emp.name}</td>
                <td className="p-2 border-0">{emp.role}</td>
                <td className="p-2 border-0">{emp.email}</td>

                <td className="p-2 border-0">{emp.department}</td>
                <td className="p-2 border-0">{emp.activeTasks}</td>
                <button className={`p-1 rounded ${emp.status ==="active" ? "bg-red-200" : "bg-green-200"}`}>{emp.status}</button>
                <td className="p-2 border-0">
                  <button onClick={()=>handleDelete(emp._id)} className="text-red-500 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </div> 
  );
}*/