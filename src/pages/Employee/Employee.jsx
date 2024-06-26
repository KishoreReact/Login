import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Employee.css";
import DataTable from "../Datatable/DataTable";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";

function EmployeeForm() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          pageNo: "0",
          size: "20",
        };

        const response = await axios.get(
          "https://carxier-dev.tahrtech.in/swagger-ui/index.html#/Employee/all_17",
          { params: params }
        );
        setUsers(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClicks = () => {};

  const studentColumns = React.useMemo(
    () => [
      { Header: "Name", accessor: "Name" },
      { Header: "Email", accessor: "Email" },
      { Header: "Role", accessor: "Role" },
      { Header: "Active status", accessor: "Activestatus" },
      { Header: "Designation", accessor: "Designation" },
      { Header: "Date of Birth", accessor: "dateofbirth" },
    ],
    []
  );

  const studentData = [
    {
      Name: "John Doe",
      Email: "john@gmail.com",
      Role: "Manager",
      Activestatus: "Active",
      Designation: "Project manager",
      dateofbirth: "11-1-1998",
    },
    {
      Name: "John Doe2",
      Email: "john2@gmail.com",
      Role: "Manager",
      Activestatus: "Active",
      Designation: "Project manager",
      dateofbirth: "11--1998",
    },
  ];

  return (
    <div>
      <div>
        <div className="list_employee" onClick={handleClicks}>
          List of Employees
        </div>
      </div>
      <div className="custom-table">
        {
          <DataTable
            columns={studentColumns}
            data={studentData}
            pagination
            striped
          />
        }
      </div>
      <button className="btn-log" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default EmployeeForm;
