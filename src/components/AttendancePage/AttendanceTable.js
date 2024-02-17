import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import { config } from "../../App";
import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Attendence.css";
import Header from "../Header";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  fetchAttendanceData,
  fetchEmployeeData,
  fetchSiteData,
} from "../../actions/index";
import { useSelector, useDispatch } from "react-redux";

function AttendanceTable() {
  const { enqueueSnackbar } = useSnackbar();
  const [attendanceTable, setAttendanceTable] = useState([]);
  const token = localStorage.getItem("token");
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    loading,
    siteData,
    siteError,
    employeeData,
    employeeError,
    attendanceData,
    attendanceError,
  } = useSelector((state) => state);

  const [headerValues, setHeaderValues] = useState([
    { siteId: "", month: "", year: "" },
  ]);

  useEffect(() => {
    dispatch(fetchEmployeeData());
    dispatch(fetchSiteData());
    dispatch(fetchAttendanceData());
  }, [dispatch]);

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = [
    { value: "2024", label: "2024" },
    // Add more years as needed
  ];

  const daysInMonth = () => {
    const now = new Date();
    return new Date(+headerValues.year, +headerValues.month, 0).getDate();
  };
  // Generate an array of numbers from 1 to the number of days in the month
  const daysArray = Array.from({ length: daysInMonth() }, (_, i) => i + 1);

  function handleHeaderInput(e) {
    const { name, value } = e.target;
    setHeaderValues({ ...headerValues, [name]: value });
  }
  
  useEffect(() => {
    const data = attendanceData.attendanceData.filter(
      (item) =>
        item.siteId === headerValues.siteId &&
        new Date(item.attendanceDate).getMonth() + 1 == headerValues.month &&
        new Date(item.attendanceDate).getFullYear() == headerValues.year
    );
    const totalEmployees = Array.from(
      new Set(data.map((obj) => obj.empId))
    ).map((id) => {
      return data.find((a) => a.empId === id);
    });
    let empAttendance = [];
    for (let i = 0; i < totalEmployees.length; i++) {
      empAttendance.push({
        empId: totalEmployees[i].empId,
        empName: totalEmployees[i].empName,
        attendance: [],
        totalDayReport: [{present:0, halfDay:0, absent: 0}]
      });
      for (let j = 0; j < data.length; j++) {
        if (
          data[j].dayReport === "present" &&
          totalEmployees[i].empId === data[j].empId
        ) {
          empAttendance[i].attendance[+data[j].attendanceDate.split("-")[2]] =
            "P";
            empAttendance[i].totalDayReport[0].present = +empAttendance[i].totalDayReport[0].present + 1;
        } else if (
          data[j].dayReport === "halfDay" &&
          totalEmployees[i].empId === data[j].empId
        ) {
          empAttendance[i].attendance[+data[j].attendanceDate.split("-")[2]] =
            "H";
            empAttendance[i].totalDayReport[0].halfDay = +empAttendance[i].totalDayReport[0].halfDay + 1;
        } else if (
          data[j].dayReport === "absent" &&
          totalEmployees[i].empId === data[j].empId
        ) {
          empAttendance[i].attendance[+data[j].attendanceDate.split("-")[2]] =
            "A";
            empAttendance[i].totalDayReport[0].absent = +empAttendance[i].totalDayReport[0].absent + 1;
        }
      }
    }
    setAttendanceTable(empAttendance);
  }, [headerValues]);

  const handleDelete = async (deleteData, index) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete attendance of "${deleteData.empName}" for "${`${headerValues.year + '-' + headerValues.month + '-' + ((index + 1) < 10 ? "0" + (index + 1) : +(index + 1))}`}"?`);
    if (confirmDelete) {
        try {
            const response = await axios.delete(`${config.endpoint}attendance/`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    empId: deleteData.empId,
                    attendanceDate: `${headerValues.year + '-' + headerValues.month + '-' + ((index + 1) < 10 ? "0" + (index + 1) : +(index + 1))}`
                }
            });

            if (response.status === 204) {
                enqueueSnackbar("Data Deleted", { variant: "success" });
                window.location.reload();
            }
        } catch (e) {
            if (e.response && e.response.status === 400) {
                enqueueSnackbar(e.response.data.message, { variant: "error" });
            } else {
                enqueueSnackbar("Something went wrong in the backend", { variant: "error" });
            }
        }
    }
  };

  return (
    <>
      <Header />
      <Container fluid>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <h3 className="mb-3">Select Site</h3>
            <Form.Select
              name="siteId"
              value={headerValues.siteId}
              onChange={(e) => handleHeaderInput(e)}
            >
              <option value="">Select an option</option>
              {siteData?.siteData.map((x) => (
                <option key={x.siteId} value={x.siteId}>
                  {x.siteName}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={4}>
            <h3 className="mb-3">Month</h3>
            <Form.Select
              name="month"
              value={headerValues.month}
              onChange={(e) => handleHeaderInput(e)}
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={4}>
            <h3 className="mb-3">Year</h3>
            <Form.Select
              name="year"
              value={headerValues.year}
              onChange={(e) => handleHeaderInput(e)}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <div style={{paddingTop:'10px'}}>
      {attendanceTable?.map((item, index) => (
      <div className="container-fluid" key={index}>
        <div className="row">
          <div className="col-sm-12 col-md-2 mb-3">
            <span>{item.empName}</span>
          </div>
          <div className="col-sm-12 col-md-2 mb-3 d-flex flex-column">
            <span className="me-3">Present: {item.totalDayReport[0].present}</span>
            <span className="me-3">Half Day: {item.totalDayReport[0].halfDay}</span>
            <span>Absent: {item.totalDayReport[0].absent}</span>
          </div>
          <div className="col-sm-12 col-md-8" style={{paddingRight:'2px'}}>
            <div className="table-responsive" style={{paddingTop:'10px'}}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {daysArray.map((day, index) => (
                      <th key={index}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysArray.map((day, index) => (
                    <td
                      style={{
                        backgroundColor:
                          item.attendance[index + 1] === "P"
                            ? "green"
                            : item.attendance[index + 1] === "A"
                            ? "red"
                            : item.attendance[index + 1] === "H"
                            ? "yellow"
                            : "#FFFEF9",
                      }}
                      key={index}
                      onClick={()=>handleDelete(item,index)}
                    >
                      {item.attendance[index + 1]}
                    </td>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ))}
    </div>
  </>
  );
}
export default AttendanceTable;