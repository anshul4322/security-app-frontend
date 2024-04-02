import { Button, Avatar, Stack } from '@mui/material';
import './Header.css'
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';

const Header = () => {

    const history = useHistory();

    const logout = () =>{
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        history.push("/")
    };

    return(
        <div className="header">
        <div className="container">
            <div className="row">
                <div className="col">
                    <Link to="/home" className="logo-link">
                            <img src='SS_logo.jpeg' alt="Logo" className="logo" />
                    </Link>
                </div>
                <div className="col">
                    <h1>S S Security Services</h1>
                </div>
                <div className="col-md-3 d-md-block d-none text-end">
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    </div>
    )
}
    
export default Header;