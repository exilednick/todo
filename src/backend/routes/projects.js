const express = require('express');
require('dotenv').config();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const uri = `mongodb+srv://Nikhil:${process.env.DB_PASS}@hatio.iwxkx.mongodb.net/Hatio?retryWrites=true&w=majority`

async function loadProjects() {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('Hatio').collection('projects');
}

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers' , 'Content-type');
    next();
})

router.get('/', async(req, res) => {
    const projects = await loadProjects();
    let id = req.query.username;
    
    res.status(200).send(await projects.find({
        'username': id
    }).toArray());
});

router.post('/', async(req, res) => {
    console.log('Got', req.body);
    const projects = await loadProjects();
    let time = new Date();
    projects.insertOne({
        username: req.query.username,
        title: req.body.title,
        createdAt: time.toUTCString(),
        listOfTodos : []
    });
    res.status(201).send();
})

router.patch('/', async(req, res) => {
    const projects = await loadProjects();
    console.log('Got', req.body);
    projects.updateOne({
        '_id': ObjectID(req.query.id)
    }, {
        $set: {
            'title': req.body.title
        }
    })

    res.status(201).send();
})

router.delete('/', async(req, res) => {
    const projects = await loadProjects();
    projects.deleteOne({
        '_id': ObjectID(req.query.id)
    })
    res.status(200).send();
})
module.exports = router;