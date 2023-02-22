import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register';
import Home from './components/Home'
import GuardDetails from './components/GuardDetails';
import PointDetail from './components/PointDetail'
import Attendence from './components/AttendancePage/Attendance';

export const config = {
  endpoint: `https://security-backend.onrender.com/v1/`,
};

function App() {
  return (
    <Switch>
    <div className="App">
       <Route exact path="/">
          <Attendence />
          {/* <Home /> */}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>     
        <Route exact path="/details">
          <GuardDetails />
        </Route> 
        <Route exact path="/PointDetail">
          <PointDetail />
        </Route> 
    </div>
    </Switch>
  );
}

export default App;
