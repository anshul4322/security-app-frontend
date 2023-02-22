import './Login.css'
import { TextField,Stack } from "@mui/material";      
import { Box } from "@mui/system";
import { CircularProgress, Button } from "@mui/material";
import react,{useState} from "react";
import { useHistory, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { config } from "../App";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const history = useHistory();

   const login = async(formData) => {
    if(!validateInput(formData)){return;}
    try{
      setLoading(true);
      const response = await axios.post(`${config.endpoint}/auth/login`,{
      email: formData.email,
      password: formData.password
    })
    setLoading(false);
    if(response.status === 200){
      enqueueSnackbar("Logged in", {variant:"success"})
      persistLogin(response.data.tokens.access.token, response.data.user.email,response.data.user.name);
      history.push("/");
    }
    }catch(e){
      setLoading(false);
      if(e.response && e.response.status === 401){
        enqueueSnackbar(e.response.data.message, {variant:"error"})
      }else{
        enqueueSnackbar("something went wrong in the backend", {variant:"error"})
      }
    }
  }
  const data = (name)=>(e) =>{
    setFormData({...formData, [name]: e.target.value})
  }
  
  const validateInput = (data) => {
    if(!data.email){
      enqueueSnackbar("Email is a required field", {variant:"warning"});
      return false;
    }
    if(!data.password){
      enqueueSnackbar("Password is a required field", {variant:"warning"});
      return false;
    }
    return true;
  };

  const persistLogin = (token, email,name) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('name', name)
  };

    return(
        <Box 
        className="imageType"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
        > 
        {/* <Header hasHiddenAuthButtons /> */}
        <Box className="content">
          <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
            <img src="SS logo.jpeg" alt=""></img>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              title="Email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={data("email")}
              fullWidth
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              fullWidth
              placeholder="Enter a password"
              value={formData.password}
              onChange={data("password")}
            />
            {
              loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress size={25} color="primary" />
                </Box>
              ): (
                <Button className="button" variant="contained" onClick={()=>login(formData)} >
                Login
                </Button>
              )
            }         
            <p className="secondary-action">
              Don't have an account?{" "}
              <Link className="link" to="/register">Register now</Link>            
            </p>
          </Stack>
        </Box>
      </Box>
    
    )
}

export default Login