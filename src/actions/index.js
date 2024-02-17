import axios from 'axios';
import {config} from "../App";
import { FETCH_SITE_DATA_FAILURE, FETCH_SITE_DATA_SUCCESS, FETCH_SITE_DATA_REQUEST, FETCH_EMPLOYEE_DATA_REQUEST, FETCH_EMPLOYEE_DATA_SUCCESS, FETCH_EMPLOYEE_DATA_FAILURE,
  FETCH_ATTENDANCE_DATA_REQUEST, FETCH_ATTENDANCE_DATA_SUCCESS, FETCH_ATTENDANCE_DATA_FAILURE } from './actionType';

const token = localStorage.getItem("token");

export const siteDataRequest = () => ({
    type: FETCH_SITE_DATA_REQUEST
  });
  
  export const siteDataSuccess = (data) => ({
    type: FETCH_SITE_DATA_SUCCESS,
    payload: data
  });
  
  export const siteDataFailure = (error) => ({
    type: FETCH_SITE_DATA_FAILURE,
    payload: error
  });

export const fetchSiteData = () => {
    return (dispatch) => {
      dispatch(siteDataRequest());
      axios.get(`${config.endpoint}siteData/getSiteData`,
        {headers: {'content-type': 'application/json','Authorization': `Bearer ${token}`},
        })
        .then(response => {
          const data = response.data;
          dispatch(siteDataSuccess(data));
        })
        .catch(error => {
          dispatch(siteDataFailure(error.message));
        });
    };
};

export const employeeDataRequest = () => ({
  type: FETCH_EMPLOYEE_DATA_REQUEST
});

export const employeeDataSuccess = (data) => ({
  type: FETCH_EMPLOYEE_DATA_SUCCESS,
  payload: data
});

export const employeeDataFailure = (error) => ({
  type: FETCH_EMPLOYEE_DATA_FAILURE,
  payload: error
});

export const fetchEmployeeData = () => {
  return (dispatch) => {
    dispatch(employeeDataRequest());
    axios.get(`${config.endpoint}employeeData/getEmployeeData`,
      {headers: {'content-type': 'application/json','Authorization': `Bearer ${token}`},
      })
      .then(response => {
        const data = response.data;
        dispatch(employeeDataSuccess(data));
      })
      .catch(error => {
        dispatch(employeeDataFailure(error.message));
      });
  };
};
export const attendanceDataRequest = () => ({
  type: FETCH_ATTENDANCE_DATA_REQUEST
});

export const attendanceDataSuccess = (data) => ({
  type: FETCH_ATTENDANCE_DATA_SUCCESS,
  payload: data
});

export const attendanceDataFailure = (error) => ({
  type: FETCH_ATTENDANCE_DATA_FAILURE,
  payload: error
});

export const fetchAttendanceData = () => {
  return (dispatch) => {
    dispatch(attendanceDataRequest());
    axios.get(`${config.endpoint}attendance/getAttendance`,
      {headers: {'content-type': 'application/json','Authorization': `Bearer ${token}`},
      })
      .then(response => {
        const data = response.data;
        dispatch(attendanceDataSuccess(data));
      })
      .catch(error => {
        dispatch(attendanceDataFailure(error.message));
      });
  };
};