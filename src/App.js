import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register';
import Home from './components/Home'
import EmployeeDetails from './components/EmployeeDetails';
import AddSiteDetail from './components/AddSiteDetail'
import AttendanceRegister from './components/AttendancePage/AttendanceRegister';
import AttendanceDetail from './components/AttendancePage/AttendanceTable'

export const config = {
  endpoint: `https://security-backend.onrender.com/v1/`,
  // endpoint: `http://localhost:8080/v1/`,
};

function App() {
  return (
    <Switch>
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>     
      <Route exact path="/details">
        <EmployeeDetails />
      </Route> 
      <Route exact path="/addSiteDetail">
        <AddSiteDetail />
      </Route> 
      <Route exact path="/attendanceDetail">
        <AttendanceDetail />
      </Route>
      <Route exact path="/attendanceRegister">
        <AttendanceRegister />
      </Route> 
    </div>
    </Switch>
  );
}

export default App;
