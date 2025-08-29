require('dotenv').config();

const express = require('express');
const http = require('http');
const createConnection = require('./data/connection');

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => { console.log(`Listening on port: ${port}`) });
app.use(express.json({ limit: '1mb' }));

const score_db = createConnection('score');

app.post('/score/', async function (request, response) {
    const data = request.body;

    await score_db.insert(data);
    response.json(data);
})

app.get('/score/', async function(_, response) {
    try {
        const data = await score_db.find({}, { sort: { duration: 1 } });
        response.json(data);
    } catch (err) {
        response.end();
        throw (err);
    }
});
app.use(express.static('public'));
