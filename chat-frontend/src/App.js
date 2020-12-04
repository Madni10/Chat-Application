import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/chatPage";
import {
  Link,
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import ChatPage from "./components/chatPage";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <Chat /> */}
      <Router>
        {/* <ul>
            <button variant="outlined" color="primary" href="#outlined-buttons">
              <Link to="/">Login Page</Link>
            </button>
            <button variant="outlined" color="primary" href="#outlined-buttons">
              <Link to="/register">Register Page</Link>
            </button>
          </ul> */}
        <Switch>
          <Route exact path="/" component={Login}>
            <Login />
          </Route>
          <Route path="/register" component={Register}>
            <Register />
          </Route>
          <Route path="/chat" component={Chat}>
            <Chat />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
