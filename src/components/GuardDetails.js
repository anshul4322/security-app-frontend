import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory, Link } from "react-router-dom";
import {config} from "../App";
import "./GuardDetails.css"

const GuardDetails = () => {
    const { enqueueSnackbar } = useSnackbar();
  
    let [loading, setLoading] = useState(false);

    let [guardData, setGuardData] = useState({
        name: "",
        phone: "",
        address: "",
        age: "",
        manType:"",
        currentWorking: "",
        salary: "",
        vacant: "",
    });

    const history = useHistory();

    const token = localStorage.getItem("token");

    const custData = async(guardData) => {
      
        if(!validateInput(guardData)){return;}
        try{
            setLoading(true);
            const response = await axios.post(`${config.endpoint}guardData/form`,
            {guardData},
            {headers: {'content-type': 'application/json','Authorization': `Bearer ${token}`},
            })
            setLoading(false);   
            if(response.status === 201){
              enqueueSnackbar("Data Saved", {variant:"success"})
              history.push("/addData");
            }
        }catch(e){
          setLoading(false);
          console.log(e.response.status,"response")
          if(e.response && e.response.status === 400){
            enqueueSnackbar(e.response.data.message, {variant:"error"})
          }else{
            enqueueSnackbar("something went wrong in the backend", {variant:"error"})
          }
        }
    }

    const data = (name)=>(e) =>{
        setGuardData({...guardData, [name]: e.target.value})
    }
    const validateInput = (data) => {
        if(!data.phone){
            enqueueSnackbar("Phone is a required field", {variant:"warning"});
            return false;
        }
        return true;
    }

    return(
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="10vh"
    >
    <Header />
      <Box className="content">
        <Stack spacing={2} className="form">
        <h2 className="title">Guard Details</h2>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            title="Name"
            name="name"
            placeholder="Enter Name"
            value={guardData.name}
            onChange={data("name")}
            fullWidth
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            title="Phone"
            name="phone"
            placeholder="Enter Phone no."
            value={guardData.phone}
            onChange={data("phone")}
            fullWidth
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            title="Address"
            name="address"
            placeholder="Enter Address"
            value={guardData.colorCode}
            onChange={data("address")}
            fullWidth
          />
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            title="Age"
            name="age"
            placeholder="Enter Age"
            value={guardData.age}
            onChange={data("age")}
            fullWidth
          />
          {
            loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={25} color="primary" />
              </Box>
            ): (
              <Button className="button" variant="contained" onClick={()=>custData(guardData)} >
              Save
              </Button>
            )
          }         
        </Stack>
      </Box>
      <Footer />
    </Box>
    )
}

export default GuardDetails;