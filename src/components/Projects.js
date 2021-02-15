import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {useParams} from 'react-router-dom';
import ProjectItems from './ProjectItems';
import Spinner from './Spinner';
const axios = require('axios');

const Projects = () => {
    const {id} = useParams();
    const [projects, setProjects] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchProjects() {
        const resp = await axios.get('http://localhost:4000/api/projects', {
          params: {
            'username': id
          }
        });
        setProjects(resp.data);
        setLoading(false);
      }
      fetchProjects();
    }, [id, updated]);
    if(loading)
      return (
        <Spinner/>
      )
      else {
        return (
          <div>
              <Grid container spacing={0} justify="center" style={{margin:"auto"}}>
                <Grid item xs={12} style = {{margin:"0vw 5vw 0vw 43vw", height:"3vw"}}>
                  <h1>Welcome {id}</h1>
                </Grid>
                <Grid item xs={12} style = {{margin:"0vw 5vw 3vw 46.5vw", height:"3vw"}}>
                  <h1>Projects</h1>
                </Grid>
                <Grid item >
                  <ProjectItems key={123} project={projects} setUpdated = {setUpdated} updated ={updated} id = {id} create = {1}/>
                </Grid>
                {
                  projects.map(project => (
                    <ProjectItems key={project._id} project={project} setUpdated = {setUpdated} updated = {updated} id = {id} create={0}/>
                  ))
                }
              </Grid>
          </div>
        )
      }
}

export default Projects