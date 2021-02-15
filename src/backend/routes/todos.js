const express = require('express');
require('dotenv').config();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const uri = `mongodb+srv://Nikhil:${process.env.DB_PASS}@hatio.iwxkx.mongodb.net/Hatio?retryWrites=true&w=majority`

async function loadTodo() {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('Hatio').collection('todo');
}

async function loadProjects() {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('Hatio').collection('projects');
}

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
})

router.get('/', async(req, res) => {

    const todo = await loadTodo();
    res.status(200).send(await todo.find({
        'projectId': req.query.projectId
    }).toArray());
});

router.post('/', async(req, res) => {
    const todo = await loadTodo();
    const projects = await loadProjects();
    todo.insertOne({
        desc: req.body.desc,
        username: req.body.username,
        status: req.body.status,
        projectId: req.body.id,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }, (err, id) => {
        if(err)
            return;
        else {
            projects.updateOne({
                '_id': ObjectID(req.body.id)              
            }, {
                $push: {
                    'listOfTodos' : id.insertedId 
                }
            })
        }
    });
    res.status(201).send();
})
module.exports = router;