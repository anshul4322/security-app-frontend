import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import Popup from 'reactjs-popup';
import PointDetailCard from './PointDetailCard';

const PointDetail = () => {
    
    return(
        <div><br></br>
            <Popup trigger={<button> Add New Point </button>} align="left" type="contained">
                <form>
                
                </form>
            </Popup>
            <PointDetailCard />
        </div>
    )
}

export default PointDetail;