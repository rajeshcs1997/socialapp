import React, { useState, useEffect } from "react";
import { TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareIcon from '@material-ui/icons/Share';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
}));

function Socialmedia() {
	const classes = useStyles();
	const [Title, setTitle] = useState("");
	const [Body, setBody] = useState("");
	const [Image, setImage] = useState([]);
	const [currentuser, setcurrentuser] = useState("");
	const [post, setPost] = useState([]);
	const [like, setLike] = useState(false);
	const [text, setText] = useState("");
	const [comment, setComment] = useState([]);
	const [commentId, setCommentId] = useState([]);
	const [likeId, setLikeId] = useState([]);

	useEffect(() => {
    const items = JSON.parse(localStorage.getItem('currentuser')) || [];
		setcurrentuser(items)
  },[]);
	useEffect(() => {
	 	const items = JSON.parse(localStorage.getItem('post')) || [];
		setPost(items)
 	},[]);

	const handleTitleChange = (e) =>{
		setTitle(e.target.value)
	}

	const handleBodyChange = (e) =>{
		setBody(e.target.value)
	}

	const handleImageChange = (e) =>{
		//setImage(e.target.files[0]);
		if (e.target.files && e.target.files[0]){
		const reader = new FileReader();
		const objectURL = reader.readAsDataURL(e.target.files[0]);
		//const objectURL=URL.createObjectURL(e.target.files[0]);
    //setImage(pre=> [...pre,objectURL])
	    reader.onloadend = function (e) {
	      setImage(pre=> [...pre,reader.result])
	    }
		}
	}
  
  const handleSubmit = (e) =>{
		e.preventDefault();

		const data ={id:uuidv4(), url:Image,user:currentuser,Title:Title,Body:Body}
		setPost(pre=> [...pre,data])

		let postData=post;
		postData.push(data);
		setPost(postData);
		localStorage.setItem('post', JSON.stringify(post))
		setTitle("")
		setBody("")
		setImage("")
	}

	const handleLike = (e,res) =>{
		setLike(!like)
		//setLikeId((prev)=>[...prev,res.id])
		if(likeId && likeId.includes(res.id)){
			//likeId.splice(likeId.indexOf(res.Id),1)
			let afterLikeiId = likeId.filter(value => value !== res.id)
      setLikeId(afterLikeiId)
		}
		else
			setLikeId((prev)=>[...prev,res.id])
	}
	const handleComment = (e,res) =>{
		//setText(e.target.value)
		setCommentId(res.id)
		if(commentId===res.id){
			setText(e.target.value)
		}
	}
	const handleCommentSubmit = (e,res) =>{
		e.preventDefault();
		setText("");
		setComment((prev)=>[...prev,text])
	}
	console.log("image",Image)
  return (
    <div className="App">
  		<h1 style={{color:"#4CAF50"}}>Welcome to {currentuser.Name}</h1>
  		<div>
				<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
				  <TextField
				  id="outlined-basic"
				  label="Title"
				  variant="outlined"
				  value={Title}
				  onChange={handleTitleChange}
				  />

				  <TextField
				  id="outlined-basic"
				  label="Body"
				  variant="outlined"
				  value={Body}
				  onChange={handleBodyChange}
				  /><br/>

				  <input
				  	className="testfile"
		        color="primary"
		        accept="image/*"
		        type="file"
		        onChange={handleImageChange}
		        id="icon-button-file"
		      /><br/>

				  <input className="button" type="submit" value="Post" />
				</form>
			</div>
		<div>
  {post && post.map((res,i)=>(
  	<div style={{ margin: "22px 238px"}}>
  		<Card>
      <CardActionArea>
      	<h3 style={{color:"#4CAF50"}}>{res.user.Name}</h3>
        <CardMedia
          component="img"
          alt="image not found"
          height="140"
          image={res.url[0]}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {res.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {res.Body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div style={{display: "flex", gap: "70px"}}>
	      <CardActions>
	        <Button size="small" color="primary" onClick={(e)=>handleLike(e,res)}>
	          {likeId.includes(res.id) ? <ThumbUpAltIcon/> : <ThumbUpAltOutlinedIcon/>}
	        </Button>
	      </CardActions>
	      <form onSubmit={(e)=>handleCommentSubmit(e,res)}>
	      	<TextField 
	     		id="standard-basic"
	     		label="comment"
	     		autoComplete="off"
	     		value={text}
	     		onChange={(e)=>handleComment(e,res)}
	      	/>
	      </form>
	      <spam style={{display: "flex", alignItems: "center"}}><ShareIcon/>share</spam>
      </div>
      {comment.map((res)=><p style={{display: "flex", marginLeft: "150px"}}>{res}</p>)}
    	</Card>
  	</div>
  	))}
  </div>
	</div>
  );
}

export default Socialmedia;