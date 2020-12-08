import React, { useEffect, useState } from "react";
import cssClasses from "./chat.module.css";
import Register from "./Register";
import Chat from "./chatPage";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const baseUrl = "http://localhost:50860/api/";

const Login = () => {
  const [state, setState] = useState({
    Username: "",
    Password: "",
  });
  const history = useHistory();

  const [registerPage, onRegisterPage] = useState(false);
  let change = false;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  var user = {
    Username: state.Username,
    Password: state.Password,
  };

  const goToChat = (data) => {
    history.push({
      pathname: "/chat",
      state: { data },
    });
  };

  const onLoginClick = () => {
    debugger;
    var Userdata = JSON.stringify(user);
    axios
      .post(baseUrl + "User/checkLogin", user)
      .then(function (response) {
        if (response.data.status == true) {
          debugger;
          goToChat(response.data);
        } else {
          swal("Connot Login!", "Credentials are not Correct!", "error");
        }
      })
      .catch(function (error) {
        alert("Somthing went Wrong!");
      });
  };

  function onRegisterClick() {
    history.push({
      pathname: "/register",
    });
  }

  const loginCredentials = () => {
    return (
      <div className={cssClasses.LoginBox}>
        <h1>Login</h1>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <TextField
            name="Username"
            label="Username"
            type="text"
            value={state.Username}
            onChange={handleInputChange}
            variant="filled"
          />
          <br />
          <br />
          <TextField
            name="Password"
            label="Password"
            type="password"
            value={state.Password}
            onChange={handleInputChange}
            variant="filled"
          />
          <br />
          <br />
        </Box>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={onLoginClick}
        >
          Login
        </Button>

        <Button variant="contained" color="primary" onClick={onRegisterClick}>
          Register
        </Button>
      </div>
    );
  };

  return loginCredentials();
};

export default Login;
