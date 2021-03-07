import React, { useState, useEffect } from "react";
import { TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
}));

function Login() {
	let history = useHistory();

	const classes = useStyles();
	const [Email, setEmail] = useState("");
	const [error, seterror] = useState("");
	const [Password, setPassword] = useState("");
	const [Users, setUsers] = useState([]);
  
	useEffect(() => {
    const items = JSON.parse(localStorage.getItem('Users')) || [];
		setUsers(items)
  },[]);

	const handleEmailChange = (e) =>{
		setEmail(e.target.value)
	}
	const handlePasswordChange = (e) =>{
		setPassword(e.target.value)
	}
	const handleSubmit = (e) =>{
		e.preventDefault();
		let data=Users;
		data.map(value => {
    if (value.Email===Email && value.Password===Password) {
      history.push("/Socialmedia");
      localStorage.setItem('currentuser', JSON.stringify(value))
      window.location.reload()
    }
    if (value.Email!==Email || value.Password!==Password) {
    	seterror("user not exist")
    }
  });
	}
  return (
    <div className="App">
  		<h1 style={{color:"#4CAF50"}}>Login</h1>
	  		<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
				  <TextField
				  id="outlined-basic"
				  label="Email"
				  variant="outlined"
				  value={Email}
				  onChange={handleEmailChange}
				  />

				  <TextField
				  id="outlined-basic"
				  label="Password"
				  variant="outlined"
				  type="password"
				  value={Password}
				  onChange={handlePasswordChange}
				  /><br/>
				  <spam style={{color: "red"}}>{error}</spam><br/>
				  <input className="button" type="submit" value="Submit" />
				</form>
    </div>
  );
}

export default Login;