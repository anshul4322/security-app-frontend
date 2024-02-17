import {siteReducer, employeeReducer, attendanceReducer} from "./reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    siteData: siteReducer,
    employeeData: employeeReducer,
    attendanceData: attendanceReducer
})

export default rootReducer;