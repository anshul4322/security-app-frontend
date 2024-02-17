import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Header from "./Header"
import Footer from "./Footer";
import './Home.css'
import {useHistory} from "react-router-dom";

const Home = () =>{

    const history = useHistory();

    const guardDetails = () => {
        history.push("/details")
    }

    const addSiteDetail = () => {
        history.push("/addSiteDetail")
    }
    const attendanceRegister = () => {
        history.push("/attendanceRegister")
    }
    const attendanceDetail = () => {
        history.push("/attendanceDetail")
    }
    return(
        <>
        <Header /><br></br>
        <div className="container-fluid">
            <div className="row">
                <Cards title="Site Details" text="This is an option to manage site data" name="View Details" page={addSiteDetail}/>
                <Cards title="Employee Details" text="This is an option to maintain Employee data" name="View Details" page={guardDetails}/>
                <Cards title="Attendance Details" text="This is an option to add site data" name="View Details" page={attendanceDetail}/>
                <Cards title="Salary Details" text="This is an option to view salary details" name="View Details"/>
                <Cards title="Attendance Register" text="Please open this to add Attendance details" name="Add Attendance" page={attendanceRegister}/>
            </div>
        </div>
        {/* <Footer /> */}
        </>
    )
}

function Cards({title, text, page, name}){
    return(
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-body" style={{backgroundColor:'#d5e8f7'}}>
              <h5 className="card-title" style={{color:'green'}}>{title}</h5>
              <p className="card-text">{text}</p>
              <Button onClick={page} variant="contained">{name}</Button>
            </div>
          </div>
        </div>
    )
}

export default Home;