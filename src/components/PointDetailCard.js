import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import './PointCardDetail.css'

const PointDetailCard = () => {

    return(
    <div>
    <Card>
      <CardMedia
        height="60"
    />
    <CardContent>
    <DropdownButton variant="info" className="drop-down-menu">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    </CardContent>
    </Card>
    </div>
  );
}

export default PointDetailCard;