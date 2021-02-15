const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const projects = require('./routes/projects');
const todos = require('./routes/todos');
const axios = require('axios');
require('dotenv').config();
const redirect_uri = 'http://localhost:4000/login/github/callback';
const loginUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=gist`

app.use(bodyParser.json()); 

const port = process.env.PORT || 4000;
app.use('/api/projects', projects);
app.use('/api/todos', todos);
app.use(cors());
app.get('/login/github/callback', async (req, res) => {
    const code = req.query.code;
    const resp = await axios.post('https://github.com/login/oauth/access_token',null, {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            'client_id': process.env.GITHUB_CLIENT_ID,
            'client_secret': process.env.GITHUB_CLIENT_SECRET,
            'code': code,
            'redirect_uri': redirect_uri
        }
    });
    const token_string = resp.data;
    const token = token_string.slice(token_string.search('=')+1, token_string.search('&'));
    const id = await axios.get('https://api.github.com/user', {
        headers: {
            'Authorization': `bearer ${token}`
        }
    });
    res.redirect(`http://localhost:3000/projects/${id.data.login}`);
})

app.get('/login', async(req, res) => {
    res.redirect(loginUrl);
})

app.listen(port, () => console.log('Server started'));

