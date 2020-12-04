import React, { useEffect, useState } from 'react'
import cssClasses from './chat.module.css'
import Register from "./Register"
import Chat from './chatPage'
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';


import {BrowserRouter as Router ,Switch, Route, Link, useHistory} from 'react-router-dom'

const baseUrl = "http://localhost:50860/api/"

const Login = ()=> {

    const [state,setState] = useState({
        Username:"",
        Password:""
    });
    const history = useHistory();

    const [registerPage,onRegisterPage] = useState(false);
    let change = false;
    
    const handleInputChange = e =>{
        const {name,value} = e.target;
        setState({
            ...state,
            [name]:value
        });
       // dataChange(prevState=>({...prevState, [e.target.name] : e.target.value }));
    }

    // const componentChange = () => {
    //     onRegisterPage({registerPage:true});
    // }
    

    var user = {
        Username:state.Username,
        Password:state.Password
    };

    const goToChat = (data) => {
        history.push({
            pathname: "/chat",
            state: {data}
        });
        // return <Link to="/chat"> </Link> 
         // change = true;
     }

    const onLoginClick = () => {
        debugger
        var Userdata = JSON.stringify(user);
        axios.post(baseUrl + 'User/checkLogin', user )
        .then(function(response){
            if(response.data.status == true){
                debugger
                goToChat(response.data);
              
            }
            else{
                swal("Connot Login!", "Credentials are not Correct!", "error");
            }
        })
        .catch(function(error){
            alert("Somthing went Wrong!");
            
        })

        // axios.get(baseUrl + 'User')
        // .then(function(response){
        //     if(response.data !== null){
        //         alert("Successfully LoggedIn!");
        //         console.log(response.data);
        //     }
        //     else{
        //         alert("Credentials are not Correct!")
        //     }
        // })
        // .catch(function(error){
        //     alert("Somthing went Wrong!");
            
        // })
    }

    function onRegisterClick(){
        history.push({
            pathname: "/register",
        });
    }


    const loginCredentials = () => {
        return(
           
                <div className={cssClasses.LoginBox}>
                        <h1>Login</h1>
                        <Box display="flex" flexDirection="column" justifyContent="center" >
                        {/* <input name="Username" placeholder="Username" type="text" value={state.Username} onChange={handleInputChange}/> */}
                        <TextField name="Username" label="Username" type="text" value={state.Username} onChange={handleInputChange} variant="filled" />
                        <br/>
                        <br/> 
                        {/* <input name="Password" placeholder="Password" type="password" value={state.Password} onChange={handleInputChange}/>  */}
                        <TextField name="Password" label="Password" type="password" value={state.Password} onChange={handleInputChange} variant="filled" />
                        <br/>
                        <br/>
                        </Box>
                        {/* <button type="submit" onClick={onLoginClick}>Login</button> */}
                        <Button variant="contained" color="primary" type="submit" onClick={onLoginClick}>
                        Login
                        </Button>

                        {/* <Link to="/register"> */}
                            {/* <button className={cssClasses.Samebutton}>
                                Register
                                </button>   */}
                                <Button variant="contained" color="primary" onClick={onRegisterClick}>
                                    Register
                                </Button> 
                        {/* </Link>  */}
                            
                          
                        {/* <Switch>
                            <Route path="/register" component={Register}>
                                <Register />
                            </Route>
                        </Switch> */}
                    </div>
                   
        )
    }

    return(
        loginCredentials()
    )
}

export default Login;