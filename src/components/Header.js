import { Button, Avatar, Stack } from '@mui/material';
import './Header.css'
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom"

const Header = () => {

    const history = useHistory();

    const logout = () =>{
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        history.push("/login")
  
        window.location.reload();
    };

    return(
        <>
            <div className="topnav">
            <a className="active" href="#home">Home</a>
            <a href="#news">Assigned Task</a>
            <a href="#contact">My profile</a>
            <a href="#about">About us</a>
            </div>
            <div className="topnav-2">
            <p>Welcome {localStorage.getItem("name")}</p>
            </div>
            <div className='logout-button'>
            <Button onClick={logout} 
                style={{backgroundColor: "#ff0000",padding: "5px 5px",fontSize: "15px", float:"right"}} 
                variant="contained" >
            Logout</Button>
            </div>
        </>
    )
}
    
export default Header;