import React, { useState, useEffect } from "react";
import { TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
}));

function Signup() {

	const classes = useStyles();
	const [Name, setName] = useState("");
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [Users, setUsers] = useState([]);

	useEffect(() => {
    const items = JSON.parse(localStorage.getItem('Users')) || [];
		setUsers(items)
  },[]);
	const handleNameChange = (e) =>{
  	setName(e.target.value)
	}
	const handleEmailChange = (e) =>{
		setEmail(e.target.value)
	}
	const handlePasswordChange = (e) =>{
		setPassword(e.target.value)
	}
	const handleSubmit = (e) =>{
		e.preventDefault();
		let fData={Name:Name,Email:Email,Password:Password}
		let data=Users;
		data.push(fData)
		setUsers(data)
		localStorage.setItem('Users', JSON.stringify(Users))
		setName("")
		setEmail("")
		setPassword("")
	}
	
  return (
    <div className="App">
  		<h1 style={{color:"#4CAF50"}}>Please fill the following details</h1>
	  		<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
				  <TextField
				  id="outlined-basic"
				  label="Name"
				  variant="outlined"
				  value={Name}
				  onChange={handleNameChange}
				  />

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
				  type="password"
				  variant="outlined"
				  value={Password}
				  onChange={handlePasswordChange}
				  /><br/>

				  <input className="button" type="submit" value="Submit" />
				</form>
    </div>
  );
}

export default Signup;