import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";
import {config} from "../App";
import "./EmployeeDetails.css";
import { fetchSiteData } from '../actions/index';
import { useSelector, useDispatch } from "react-redux";

const EmployeeDetails = () => {
    const { enqueueSnackbar } = useSnackbar();
  
    let [loadings, setLoading] = useState(false);

    const dispatch = useDispatch();

    const { loading, siteData, siteError } = useSelector(state => state);

    useEffect(() => {
      dispatch(fetchSiteData());
    }, [dispatch]);

    let [employeeData, setEmployeeData] = useState({
        empId: "",
        siteId: "",
        siteName: "",
        empName: "",
        phone: "",
        address: "",
        age: "",
        manType:"",
        salary: "",
        vacant: "",
    });
console.log(employeeData)
    const history = useHistory();

    const token = localStorage.getItem("token");

    const postEmployeeData = async(employeeData) => {
        if(!validateInput(employeeData)){return;}
        try{
            setLoading(true);
            const response = await axios.post(`${config.endpoint}employeeData/form`,
            {employeeData},
            {headers: {'content-type': 'application/json','Authorization': `Bearer ${token}`},
            })
            setLoading(false);   
            if(response.status === 201){
              enqueueSnackbar("Data Saved", {variant:"success"})
              window.location.reload();
            }
        }catch(e){
          setLoading(false);
          if(e.response && e.response.status === 400){
            enqueueSnackbar(e.response.data.message, {variant:"error"})
          }else{
            enqueueSnackbar("something went wrong in the backend", {variant:"error"})
          }
        }
    }

    function employeeDetails(e){
        const { name, value } = e.target;
        setEmployeeData({...employeeData, [name]: value})
    }
    const validateInput = (data) => {
        if(!data.phone){
            enqueueSnackbar("Phone is a required field", {variant:"warning"});
            return false;
        }
        return true;
    }
    useEffect(()=>{
      const name = siteData.siteData.filter((x)=>{return x.siteId == employeeData.siteId});
      setEmployeeData({...employeeData, siteName: name[0]?.siteName})
    },[employeeData.siteId])
console.log(employeeData.siteId)
    return(
    <>
    <Header />
      <form>
          <div className="text-field-page">
            <h1>Employee Registration Form</h1>
            <div className="text-field-container">
              <div className="text-field">
                <span>Employee ID</span>
                <input
                  name='empId'
                  type="text"
                  placeholder="Employee ID"
                  value={employeeData.id}
                  onChange={(e)=>employeeDetails(e)}
                />
              </div>
              <div className="text-field">
                <span>Employee Name</span>
                <input
                  name='empName'
                  type="text"
                  placeholder="Emplyee Name"
                  value={employeeData.empName}
                  onChange={(e)=>employeeDetails(e)}
                />
              </div>
              <div className="text-field">
                <span>Address</span>
                <input
                  name='address'
                  type="text"
                  placeholder="Adress"
                  value={employeeData.address}
                  onChange={(e)=>employeeDetails(e)}
                />
              </div>
              <div className="text-field">
                <span>Phone</span>
                <input
                  name='phone'
                  type="number"
                  placeholder="Phone No."
                  value={employeeData.phone}
                  onChange={(e)=>employeeDetails(e)}
                />
              </div>
              <div className="text-field">
                <span>Age</span>
                <input
                  name='age'
                  type="number"
                  placeholder="Age"
                  value={employeeData.age}
                  onChange={(e)=>employeeDetails(e)}
                />
              </div>
              <div className="text-field">
                <span>Salary</span>
                <input
                  name='salary'
                  type="text"
                  placeholder="Salary"
                  value={employeeData.salary}
                  onChange={(e)=>employeeDetails(e)}
                />
              </div>
              <div className="text-field">
                <span>Select working site</span>
                <select className="form-select" name='siteId' type="text" placeholder="Working Site" value={employeeData.siteId} onChange={(e)=>employeeDetails(e)}>
                  <option value="">Select an option</option>
                  {siteData?.siteData.map((x)=>{return <option value={x.siteId}>{x.siteName}   -   {x.siteId}</option>})}
                </select>
              </div>
            </div>
          </div>
          {
            loadings ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={25} color="primary" />
              </Box>
            ): (
              <Button className="button" variant="contained" onClick={()=>postEmployeeData(employeeData)} >
              Save
              </Button>
            )
          }
        </form>
    </>
    )
}

export default EmployeeDetails;