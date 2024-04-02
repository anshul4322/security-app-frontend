import React, {useState, useEffect} from 'react';
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import Popup from 'reactjs-popup';
import PointDetailCard from './PointDetailCard';
import { incNum, decNum } from "../actions/index";
import './AddSiteDetails.css'
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import {config} from "../App";

const AddSiteDetail = () => {
    
    const [siteDetail, setSiteDetail] = useState({
      siteId: '',
      siteName: '',
      totalEmployee: '',
      ratePerEmployee: '',
      gstPercentage: '',
      address: ''
    });

    const [loadings, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const { enqueueSnackbar } = useSnackbar();

    const history = useHistory();  

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSiteDetail({
        ...siteDetail,
        [name]: value
      });
    };
    const handleSubmit = async(e) => {
      e.preventDefault();
      // Do something with the form data (e.g., send it to the server)
      try{
        setLoading(true);
        const response = await axios.post(`${config.endpoint}siteData/form`,
        {siteDetail},
        {headers: {'content-type': 'application/json','Authorization': `Bearer ${token}`},
        })
        setLoading(false);   
        if(response.status === 201){
          enqueueSnackbar("Data Saved", {variant:"success"})
          history.push("/addSiteDetail")
        }
      }catch(e){
        setLoading(false);
        if(e.response && e.response.status === 400){
          enqueueSnackbar(e.response.data.message, {variant:"error"})
        }else{
          enqueueSnackbar("something went wrong in the backend", {variant:"error"})
        }
      }
    };
    return (
      <>
      <div>
      
    </div>
      <Header />
        <form onSubmit={handleSubmit}>
          <div className="text-field-page">
            <h1>Site Registration Form</h1>
            <div className="text-field-container">
              <div className="text-field">
                <span>Site Id</span>
                <input
                  name='siteId'
                  type="text"
                  placeholder="Site ID"
                  value={siteDetail.siteId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-field">
                <span>Site Name</span>
                <input
                  name='siteName'
                  type="text"
                  placeholder="Site Name"
                  value={siteDetail.siteName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-field">
                <span>Number Of Employees</span>
                <input
                  name='totalEmployee'
                  type="number"
                  placeholder="No. Of Employees"
                  value={siteDetail.totalEmployee}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-field">
                <span>Rate per Employee</span>
                <input
                  name='ratePerEmployee'
                  type="number"
                  placeholder="Rate"
                  value={siteDetail.ratePerEmployee}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-field">
                <span>GST Percentage</span>
                <input
                  name='gstPercentage'
                  type="number"
                  placeholder="GST(in %)"
                  value={siteDetail.gstPercentage}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-field">
                <span>Address</span>
                <input
                  name='address'
                  type="text"
                  placeholder="Address"
                  value={siteDetail.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <Button className='centeredButton' variant='contained' type="submit">Submit</Button>
        </form>
        <Footer />
      </>
    );
}

export default AddSiteDetail;