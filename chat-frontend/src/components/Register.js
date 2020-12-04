import React, { useState } from 'react'
import cssClasses from './chat.module.css'
import axios from 'axios'
import Login from './Login'
import {BrowserRouter as Router ,Switch, Route, Link,useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import swal from 'sweetalert';


const Register = () => {

    const baseUrl = "http://localhost:50860/api/"

    const [state,setState] = useState({
        Username: "",
        Email: "",
        Password: ""
    });

    const history = useHistory();
    const handleInputChange = e =>{
        const {name,value} = e.target;
        setState({
            ...state,
            [name]:value
        });
    }

    var user = {
        Username:state.Username,
        Password:state.Password,
        Email:state.Email
    };

    const moveToLoginPage = () => {
        history.push({
            pathname: "/"
        });
        
    }
    const onRegisterUser = () =>{
        axios.post(baseUrl+'User/registerUser',user)
        .then(function(response){
            if(response.data == true){
                swal("User registerd Successfully!", "Click OK to Continue", "success");

                moveToLoginPage();
            }
            else{
                alert("Already Exist")
            }
        })
        .catch(function(error){
            alert("Somthing went Wrong!");
            
        })
    }

    function backToLogin(){
        history.push({
            pathname: "/",
        });
    }

    const registerCredentials = () => {
        return(
          
               
            <div className={cssClasses.LoginBox}>
            
                <h1>Registration</h1>
                <Box display="flex" flexDirection="column" justifyContent="center" margin="40px">
                {/* <input name="Username" type="text" placeholder="Username" value={state.Username} onChange={handleInputChange}/> */}
                <TextField name="Username" type="text" value={state.Username} onChange={handleInputChange} label="Username" variant="filled" /> <br/> 
                {/* <input name="Email" type="email" placeholder="Email" value={state.Email} onChange={handleInputChange}/> */}
                <TextField name="Email" type="email" value={state.Email} onChange={handleInputChange} label="Email" variant="filled" /> <br/> 
                {/* <input name="Password" type="password" placeholder="Password" value={state.Password} onChange={handleInputChange}/> */}
                <TextField  name="Password" type="password" value={state.Password} onChange={handleInputChange} label="Password" variant="filled" /> <br/> 

                {/* <button type="submit" onClick={onRegisterUser}> Register </button> */}
               

                {/* <Link to="/">
                    <button className={cssClasses.Samebutton}>
                        Back to Login
                    </button>   
                </Link>  */}
                </Box>
                <Button variant="contained" color="primary" type="submit" onClick={onRegisterUser}>
                    Register
                </Button>

                <Button variant="contained" color="primary" type="submit" onClick={backToLogin}>
                     Back to Login
                </Button>
            </div>
            
        )
    }

    return(
       registerCredentials()
    )
}

export default Register;