import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import {config} from "../../App";
import { useHistory, Link } from "react-router-dom";
import { fetchSiteData, fetchEmployeeData, fetchAttendanceData } from '../../actions/index';
import { useSelector, useDispatch } from "react-redux";
import { Form } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Header from "../Header";
import { Container, Row, Col } from 'react-bootstrap';
import "./Attendence.css"
import Footer from '../Footer'

function Attendence() {

  const dispatch = useDispatch();

  const { loading, siteData, siteError, employeeData, employeeError, attendanceData, attendanceError } = useSelector(state => state);
  
  const [filteredData, setFilteredData] = useState([]);

  useEffect(()=>{
    dispatch(fetchAttendanceData());
    dispatch(fetchSiteData());
    dispatch(fetchEmployeeData());
  },[])

  const [attendanceForm, setAttendanceForm] = useState([
    { empId: "", siteId:"", siteName:"", attendanceDate:"", empName: "", dayReport:"" }
  ]);

  const [headerValues, setHeaderValues] = useState([
    { empId: "", siteId:"", siteName:"", attendanceDate:"" }
  ]);

  const [fullAttendance, setFullAttendance] = useState([])
  
  const [loadings, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  
  const postAttendanceData = async(formValues) => {
    if(!validateInput(headerValues, attendanceForm)){return;}
    try{
        setLoading(true);
        const response = await axios.put(`${config.endpoint}attendance/daily`,
        {formValues},
        {headers: {'content-type': 'application/json','Authorization': `Bearer ${token}`},
        })
        setLoading(false);   
        if(response.status === 200){
          enqueueSnackbar("Attendance Marked", {variant:"success"})
          history.push("/home");
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
  const validateInput = (headerValues, attendanceForm) => {
    if(!headerValues.attendanceDate){
      enqueueSnackbar("attendanceDate is a required field", {variant:"warning"});
      return false;
    }
    return true;
  };
  function handleUserInput(e, i, item) {
    const objectToUpdate = filteredData.find(obj => obj.empId === item.empId);
    if(objectToUpdate && e.target.name==="dayReport"){
      objectToUpdate.dayReport = e.target.value;
    }
    const { name, value } = e.target;
    const list = [...attendanceForm];
      list[i] = {[name]: value}; 
      list[i].empId = item.empId;
      list[i].empName = item.empName;
      list[i].siteId = headerValues.siteId;
      list[i].siteName = siteData.siteData.filter((x)=>{return x.siteId == headerValues.siteId})[0]?.siteName;
      list[i].attendanceDate = headerValues.attendanceDate;
    setAttendanceForm(list);
  }
  function handleHeaderInput(e) {
    const { name, value } = e.target;
    setHeaderValues({...headerValues, [name]: value});
  }
  useEffect(() => {
    const data = employeeData.employeeData.map(emp => {
      return {
        empId: emp.empId,
        empName: emp.empName,
        siteName: emp.siteName,
        siteId: emp.siteId,
        attendance:  attendanceData.attendanceData.map((att)=>{
          if(att.empId === emp.empId){
            return { attendanceDate: att.attendanceDate, dayReport: att.dayReport, workingSiteId: att.siteId, workingSiteName: att.siteName }
          }else{return;}
        })
      };
    });
    setFullAttendance(data);
  }, [employeeData, attendanceData]);

  useEffect(() => {
    const filteredData = fullAttendance.filter(item => item.siteId === headerValues.siteId);
    if (headerValues.attendanceDate !== '') {
      filteredData.forEach(item => {
        const foundAttendance = attendanceData.attendanceData.find(att => att.empId === item.empId && att.attendanceDate === headerValues.attendanceDate);
        if (foundAttendance) {
          item.dayReport = foundAttendance.dayReport;
          item.attendanceDate = foundAttendance.attendanceDate;
        } else {
          item.dayReport = '';
          item.attendanceDate = '';
        }
      });
    }
    setFilteredData(filteredData);
  }, [headerValues, fullAttendance, attendanceData]);

  return (
  <>
    <Header />
    <Container fluid>
      <Row className="mt-3">
        <Col xs={12} md={4}>
          <h3 className="mb-3">Select Site</h3>
          <select className="form-select" name="siteId" value={headerValues.siteId} onChange={(e)=>{handleHeaderInput(e)}} >
          <option value="">Select an option</option>
            {siteData?.siteData.map((x)=>{return <option value={x.siteId}>{x.siteName}   -   {x.siteId}</option>})}
          </select>
        </Col>
        <Col xs={12} md={3}>
          <h3 className="mb-3">Date</h3>
          <Form.Control
            id="attendanceDate"
            type="date"
            name="attendanceDate"
            value={headerValues.attendanceDate}
            onChange={(e) => handleHeaderInput(e)}
          />
        </Col>
        <Col xs={12} md={3}>
          {/* <span>Total Attendance of the month: {2}</span>
          <span>Total Attendance of the day: {2}</span> */}
        </Col>
      </Row>
    </Container>
    <div style={{ paddingTop: '15px' }} className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: '100px' }}>Employee ID</th>
            <th style={{ width: '400px' }}>Name</th>
            <th style={{ width: '300px' }}>Current Site</th>
            <th style={{ width: '600px' }}>Day Report</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item, i) => (
            <tr key={i}>
              <td>{item.empId}</td>
              <td>{item.empName}</td>
              <td>{item.siteName}</td>
              <td>
                <div className="d-flex flex-column flex-md-row justify-content-md-between">
                  <button type="button" className={filteredData[i]?.dayReport === 'present' ? "btn btn-success mb-1 mb-md-0 mr-md-1" : "btn btn-secondary mb-1 mb-md-0 mr-md-1"} onClick={(e) => handleUserInput(e, i, item)} name="dayReport" value="present">Present</button>
                  <button type="button" className={filteredData[i]?.dayReport === 'halfDay' ? "btn btn-warning mb-1 mb-md-0 mr-md-1" : "btn btn-secondary mb-1 mb-md-0 mr-md-1"} onClick={(e) => handleUserInput(e, i, item)} name="dayReport" value="halfDay">Half Day</button>
                  <button type="button" className={filteredData[i]?.dayReport === 'absent' ? "btn btn-danger mb-1 mb-md-0 mr-md-1" : "btn btn-secondary mb-1 mb-md-0 mr-md-1"} onClick={(e) => handleUserInput(e, i, item)} name="dayReport" value="absent">Absent</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="btn btn-dark" onClick={() => postAttendanceData(attendanceForm)}>Save</button>
    </div>
  </>
  );
}

export default Attendence;
