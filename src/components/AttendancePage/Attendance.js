import { useState } from "react";
import AttendenceTable from './AttendanceTable';
import { Select, MenuItem} from "@mui/material"
import { Button, CircularProgress, Stack, TextField, Switch } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import {config} from "../../App";
import { useHistory, Link } from "react-router-dom";

function Attendence() {

  const [formValues, setFormValues] = useState([
    { site:"", attendenceDate:"", name: "", inTime: "", outTime: "", dayReport:"" }
  ]);
  const [headerValues, setHeaderValues] = useState([
    { site:"", attendenceDate:"" }
  ]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const attendenceData = async(formValues) => {
    // if(!validateInput(guardData)){return;}
    try{
        setLoading(true);
        const response = await axios.post(`${config.endpoint}attendance/daily`,
        {formValues},
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
  function handleUserInput(e, i) {
    const { name, value } = e.target;
    const list = [...formValues];
    list[i][name] = value;  
    for(let j=0; j<formValues.length; j++){
      list[j].site = headerValues.site;
      list[j].attendenceDate = headerValues.attendenceDate;
    }
    setFormValues(list);
  }
  function handleHeaderInput(e) {
    const { name, value } = e.target;
    setHeaderValues({...headerValues, [name]: value});
  }
  console.log(formValues,"fsna")
  const handleAddRows = (e) => {
    setFormValues([...formValues, { site:headerValues.site, attendenceDate:headerValues.attendenceDate
      , name: "", inTime: "", outTime: "", dayReport:"" }]);
  }; 
  
  const handleDelete = (i) => {   
    const deleteVal = [...formValues];
    deleteVal.splice(i);
    setFormValues(deleteVal);
  };
  return (
    <>
      <div className="border-box">
        <form onSubmit={handleSubmit}>
          <div className="form-header">Attendence Portal</div>
          <div className="header-rows">
            <span>
              <label htmlFor="site" className="header-name">
                Site<span className="req">*</span>
              </label>
              <Select
                className="select-button"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="site"
                label="Site"
                onChange={(e)=>{handleHeaderInput(e)}}
              > 
                <MenuItem value="Mahindra">Mahindra</MenuItem>
                <MenuItem value="MPCT">MPCT</MenuItem>
              </Select>
            </span>
            <span>
              <label htmlFor="attendenceDate" className="header-name">
                Ateendance Date<span className="req">*</span>
              </label>
              <input
                id="attendenceDate"
                type="date"
                name="attendenceDate"
                value={formValues.attendenceDate}
                onChange={(event) => handleHeaderInput(event)}
              ></input>
            </span>
          </div>
          {formValues.map((data, i) => {
            return (
              <div className="form-fields-class">
                <div className="header-name">
                  <span>
                    <label htmlFor="fullName">
                      Name<span className="req">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={data.name}
                      onChange={(event) => handleUserInput(event, i)}
                      maxLength={100}
                    ></input>
                  </span>
                  <span>
                    <label htmlFor="dob">
                      In-Time<span className="req">*</span>
                    </label>
                    <input
                      id="inTime"
                      type="time"
                      name="inTime"
                      value={data.inTime}
                      onChange={(event) => handleUserInput(event, i)}
                    ></input>
                  </span>
                  <span>
                    <label htmlFor="dob">
                      Out-Time<span className="req">*</span>
                    </label>
                    <input
                      id="outTime"
                      type="time"
                      name="outTime"
                      value={data.outTime}
                      onChange={(event) => handleUserInput(event, i)}
                    ></input>
                  </span>
                  <span>
                    <label htmlFor="dayReport">
                      Day Report<span className="req">*</span>
                    </label>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="dayReport"
                      value={formValues.dayReport}
                      label="DayReport"
                      onChange={(e)=>{handleUserInput(e,i)}}>

                      <MenuItem value="fullDay">Full Day</MenuItem>
                      <MenuItem value="halfDay">Half Day</MenuItem>
                    </Select>
                  </span>
                  <span>
                    <button onClick={() => handleDelete(i)}>Delete</button>
                  </span>
                </div>
              </div>
            );
          })}
          <button onClick={(e) => handleAddRows(e)}>Add Rows</button>
          <div>
            <button type="button" onClick={()=>attendenceData(formValues)}>Save</button>
          </div>
        </form>
        <div>
            <AttendenceTable />
      </div>
      </div>
    </>
  );
}

export default Attendence;
