import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import {config} from "../../App";
import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './Attendence.css';

function AttendanceTable() {

  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({});

  const history = useHistory();

  const onButtonClick = async(e,_id) => {
    const response = await axios.delete(`${config.endpoint}attendance?_id=${_id}`);
    return response;
  }

  const columns = [
    { field: 'site', headerName: 'Site', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'attendenceDate', headerName: 'Attendance Date', width: 150 },
    { field: 'dayReport', headerName: 'Day Report', width: 150 },
    { field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
      return (
        <>
        <Button
          style={{ width: 100 }}
          onClick={(e) => onButtonClick(e, params.row._id)}
          variant="contained"
        >
          Delete
        </Button>
        </> 
      );
    } },
    { field: 'inTime', headerName: 'In-Time', width: 150 },
    { field: 'outTime', headerName: 'Out-Time', width: 150 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${config.endpoint}attendance/getAttendance`,
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className='table-grid-header'>
      <div className='table-grid-header'>
      <DataGrid className='table-grid' getRowId={(row) => row._id} rows={data} columns={columns} />
    </div>
    </div>
    
  );
}


export default AttendanceTable;