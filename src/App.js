import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Socialmedia from './Components/Socialmedia';
import MyTimeline from './Components/MyTimeline'
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function App() {
  let history = useHistory();

  const [currentuser, setcurrentuser] = useState("");
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('currentuser'));
    setcurrentuser(items)
  },[]);
  return (
    <div className="App">
      <Router>
      <div>
        <nav>{
          !currentuser && (
            <ul className="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Signup">Signup</Link>
            </li>
          </ul>
          )
        }
        {
          currentuser && (
            <ul className="navbar">
            <li>
              <Link to="/MyTimeline">Your Post</Link>
            </li>
            <li>
              <Link to="/Socialmedia">Feed</Link>
            </li>
            <li>
              <Link to="/" onClick={(e)=>{
                localStorage.removeItem("currentuser");
                window.location.href="/"
              }}>Logout</Link>
            </li>
          </ul>
          )
        }  
        </nav>

        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Signup">
            <Signup />
          </Route>
          <Route exact path="/">
              <Login />
          </Route>

          {currentuser ? 
            <> 
            <Route exact path="/Socialmedia">
            <Socialmedia />
            </Route>
            <Route exact path="/MyTimeline">
            <MyTimeline />
            </Route>
            </> : 
            <Login />
        }
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
