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

function MyTimeline() {
	const classes = useStyles();
	const [post, setPost] = useState([]);
	const [currentuser, setcurrentuser] = useState("");
	const [Title, setTitle] = useState("");
	const [Body, setBody] = useState("");
	const [Image, setImage] = useState([]);
	const [like, setLike] = useState(false);
	const [text, setText] = useState("");
	const [comment, setComment] = useState([]);
	const [commentId, setCommentId] = useState([]);
	const [likeId, setLikeId] = useState([]);
	useEffect(() => {
	 	const items = JSON.parse(localStorage.getItem('post')) || [];
		setPost(items)
 	},[]);
 	useEffect(() => {
    const items = JSON.parse(localStorage.getItem('currentuser')) || [];
		setcurrentuser(items)
  },[]);

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
	const handleComment = (e) =>{
		setText(e.target.value)
	}
	const handleCommentSubmit = (e,res) =>{
		e.preventDefault();
		setText("");
		setComment((prev)=>[...prev,text])
	}
	console.log("post",post[5])
  return (
		<div>
			<h1 style={{color:"#4CAF50"}}>hey {currentuser.Name} your post</h1>
			{post && post.map((res,i)=>(
				(res.user.Email == currentuser.Email) ? (
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
				     		value={text}
				     		autoComplete='off'
				     		onChange={handleComment}
				      	/>
				      </form>
				      <spam style={{display: "flex", alignItems: "center"}}><ShareIcon/>share</spam>
			      </div>
			      {comment.map((res)=><p style={{display: "flex", marginLeft: "150px"}}>{res}</p>)}
			    	</Card>
			  	</div>) : null
	  	))}
		</div>
  );
 }

export default MyTimeline;