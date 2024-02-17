import {FETCH_SITE_DATA_FAILURE, FETCH_SITE_DATA_REQUEST, FETCH_SITE_DATA_SUCCESS, 
        FETCH_EMPLOYEE_DATA_FAILURE, FETCH_EMPLOYEE_DATA_REQUEST, FETCH_EMPLOYEE_DATA_SUCCESS,
        FETCH_ATTENDANCE_DATA_FAILURE, FETCH_ATTENDANCE_DATA_REQUEST, FETCH_ATTENDANCE_DATA_SUCCESS} from "../actions/actionType"

const initialState = {
    loading: false,
    siteData: [],
    siteError: '',
    employeeData: [],
    employeeError: '',
    attendanceData: [],
    attendanceError: ''
};

export const siteReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SITE_DATA_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_SITE_DATA_SUCCESS:
        return {
          loading: false,
          siteData: action.payload,
          siteError: ''
        };
      case FETCH_SITE_DATA_FAILURE:
        return {
          loading: false,
          siteData: [],
          siteError: action.payload
        };
      default:
        return state;
    }
  };

  export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEE_DATA_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_EMPLOYEE_DATA_SUCCESS:
        return {
          loading: false,
          employeeData: action.payload,
          employeeError: ''
        };
      case FETCH_EMPLOYEE_DATA_FAILURE:
        return {
          loading: false,
          employeeData: [],
          employeeError: action.payload
        };
      default:
        return state;
    }
  };

  export const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ATTENDANCE_DATA_REQUEST:
        return {
          ...state,
          loading: true
        };
      case FETCH_ATTENDANCE_DATA_SUCCESS:
        return {
          loading: false,
          attendanceData: action.payload,
          attendanceError: ''
        };
      case FETCH_ATTENDANCE_DATA_FAILURE:
        return {
          loading: false,
          attendanceData: [],
          attendanceError: action.payload
        };
      default:
        return state;
    }
  };


