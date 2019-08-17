const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const { promisify } = require("util")
const jwtSign = promisify(jwt.sign);

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true, useNewUrlParser: true });
let db;

const SECRET = 'privateKeySecret';
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    if (!db) {
        client.connect(function (err) {
            db = client.db('clinic');
            req.db = db.collection('data');
            next();
        });
    } else {
        req.db = db.collection('data');
        next();
    }
})
// Get all data
app.get('/', (req, res) => {
    req.db.find({}).limit(100).toArray((err, data) => res.json(data))
})
// delete all data
app.delete('/clear', async (req, res) => {
    await req.db.removeMany({})
    req.db.find({}).toArray((err, data) => res.json(data))

})
// fill with data from body
app.post('/', async (req, res) => {
    console.log(`POST insertOne()...`)
    await req.db.insertOne(req.body, (err, results) => {
        res.json(results)
    })
});

app.get('/getToken', async (req, res) => {
    const token = await jwtSign({
        name: "Asaad Saad"
    }, SECRET);
    console.log({ token })
    res.status(200).json({ token });
})

app.post('/verifyToken', async (req, res) => {
    console.log(req.body)
    if (!req.headers.authorization) {
        res.status(401).json({
            data: 'UnAuthorized, valid token required',
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    console.log({ token: decoded, body: req.body })
    res.json({ token: decoded, body: req.body });
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});
app.listen(3000, () => console.log('listening to 3000'));