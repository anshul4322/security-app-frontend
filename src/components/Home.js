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

    const pointDetail = () => {
        history.push("/pointDetail")
    }
    return(
        <>
        <Header /><br></br><br></br><br></br><br></br><br></br>
        <Box className="homeBox">
            <Button variant="contained" disableElevation onClick={guardDetails}>Add Guard Details</Button><br></br><br></br>
            <Button variant="contained" disableElevation>Add Site details</Button><br></br><br></br>
            <Button variant="contained" disableElevation>Add Task</Button><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </Box>
        <Box className="homeBox">
            <Button variant="contained" disableElevation onClick={pointDetail}>Registered Site</Button><br></br><br></br>
        </Box>
        <Footer />
        </>
    )
}

export default Home;