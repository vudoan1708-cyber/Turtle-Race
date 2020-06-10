const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const Datastore = require('nedb');
const database = new Datastore('database/score');
database.loadDatabase();

server.listen(port, () => { console.log('listening at port: ' + port) });
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/score/', function (request, response) {

    const data = request.body;

    database.insert(data);
    response.json(data);
})

app.get('/score/', function(request, response) {
    database.find({}).sort({ duration: 1 }).exec((err, data) => {
        if (err) {
            console.error(err);
            response.end();
            return;
        } else response.json(data);
    });
});