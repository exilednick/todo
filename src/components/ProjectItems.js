import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default function ProjectItems({project, setUpdated, updated, id, create}) {
    const [open, setOpen] = useState(false);
    const [editValue, setEditValue] = useState('');

    const Edit = () => {
        setOpen(!open)
        console.log(open);
    }
    const unEdit = () => {
        setOpen(false);
    }
    const postEdit = async() => {
       await axios.patch(`http://localhost:4000/api/projects?id=${project._id}`, {
            'title' : editValue
       })
       setUpdated(!updated);
       unEdit();
    }
    const handleEdit = (e) => {
        setEditValue(e.target.value)
    }
    const postCreate = async() => {
        await axios.post(`http://localhost:4000/api/projects?username=${id}`, {
            'title' : editValue
       })
       setUpdated(!updated);
       unEdit();
    }
    const classes = useStyles();
    const link = `todo/${project._id}`;
    if(!create) {
        return (
            <div style ={{padding:"0vw 10vw 0vw 10vw"}}>
                <Grid key={project._id} item xs={4}>
                    <Card style={{height:"10vw", width:"15vw"}}>
                        <CardContent>
                            Title: {project.title}
                            <br></br>
                            Created: {new Date(project.createdAt).toLocaleDateString()}
                            <CardActions>
                                <Link to = {link} style={{textDecoration:"none"}}>
                                <Button size="large" color="primary" style={{marginLeft: "1vw", marginRight:"1vw"}}>Open</Button>
                                </Link>
                                <Button size="large" color="secondary" onClick ={Edit}>Edit</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                <Backdrop className={classes.backdrop} open={open}>
                    <div style ={{backgroundColor:"white", margin:"auto",padding:"0.6vw 0vw 0.6vw 2vw", width:"30vw", height:"5vw"}}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField value={editValue} onChange = {handleEdit} id="standard-basic" label="Edit Project Title"/>
                            <Button size="large" color="primary" style={{margin:"0.9vw 2vw 1vw 3vw"}} onClick ={postEdit}>Save</Button>
                            <Button size="large" color="secondary" style={{marginLeft: "1vw", marginRight:"1vw"}} onClick ={unEdit}>Cancel</Button>
                        </form>
                    </div>
                </Backdrop>
             </div>
        )
    }
    else {
        return (
            <div style ={{padding:"0vw 10vw 0vw 10vw"}}>
                <Grid key={123} item xs={4}>
                    <Card style={{height:"10vw", width:"15vw"}}>
                        <CardContent>
                            <CardActions>
                                <Button size="large" color="secondary" onClick ={Edit}>Add Project</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                <Backdrop className={classes.backdrop} open={open}>
                    <div style ={{backgroundColor:"white", margin:"auto",padding:"0.6vw 0vw 0.6vw 2vw", width:"30vw", height:"5vw"}}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField value={editValue} onChange = {handleEdit} id="standard-basic" label="Add Project Title"/>
                            <Button size="large" color="primary" style={{margin:"0.9vw 2vw 1vw 3vw"}} onClick ={postCreate}>Save</Button>
                            <Button size="large" color="secondary" style={{marginLeft: "1vw", marginRight:"1vw"}} onClick ={unEdit}>Cancel</Button>
                        </form>
                    </div>
                </Backdrop>
            </div>
        )
    }
}
