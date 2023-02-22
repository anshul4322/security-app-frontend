import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import "./Register.css";
import { config } from "../App";
import { useHistory, Link } from "react-router-dom";
import Footer from "./Footer";

function Register(){
  const { enqueueSnackbar } = useSnackbar();

  let [loading, setLoading] = useState(false)
  let [formData, setformData] = useState({
    name: "", 
    email:"",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();

  const register = async (formData) => {
    if(!validateInput(formData)) return;
    try{
      setLoading(true);
      const response = await axios.post(`${config.endpoint}/auth/register`,{
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      setLoading(false);
      setformData({
        name: "",
        email: "", 
        password: "",
        confirmPassword: ""
      });
      if(response.status === 201)
      enqueueSnackbar("Registered successfully", {variant:"success"});
      history.push("/Login");
    }catch(e){      
      setLoading(false);
      if(e.response && e.response.status === 400){
        enqueueSnackbar(e.response.data.message, {variant:"error"})
      }else{
        enqueueSnackbar("something went wrong in the backend", {variant:"error"})
      }
    }
  }
  
  const data = (name) => (e) =>{
    setformData({ ...formData, [name]: e.target.value });
  }
  const validateInput = (data) => {
    if(!data.email){
      enqueueSnackbar("Email is required field", {variant:"warning"});
      return false;
    }
    if(data.name.length <= 4){
      enqueueSnackbar("Email Length must be of 6 characters", {variant:"warning"});
      return false;
    }
    if(!data.password){
      enqueueSnackbar("password is a required field", {variant:"warning"});
      return false;
    }
    if(data.password.length < 6){
      enqueueSnackbar("Password Length must be of 6 characters", {variant:"warning"});
      return false;
    }
    if(data.password !== data.confirmPassword){
      enqueueSnackbar("Password do not match", {variant:"warning"});
      return false;
    }
    return true;
  };
    return(
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <img src="SS logo.jpeg" alt=""></img>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            title="name"
            name="name"
            placeholder="Enter Full Name"
            onChange={data("name")}
            value={formData.name}
            fullWidth
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            title="email"
            name="email"
            placeholder="Enter Full Name"
            onChange={data("email")}
            value={formData.email}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange={data("password")}
            value={formData.password}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={data("confirmPassword")}
            value={formData.confirmPassword}
            fullWidth
          />
          {
            loading? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={25} color="primary" />
              </Box>
            ) : (
              <Button className="button" variant="contained" onClick={()=>register(formData)}>
              Register Now
              </Button>
              )
          }         
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/Login">Login here</Link>
          </p>
        </Stack>
      </Box>
    </Box>
    )
}

export default Register;