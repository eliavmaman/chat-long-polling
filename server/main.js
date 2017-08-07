const express = require('express')
var http = require('http'),
    url = require('url'),
    fs = require('fs');
const app = express();
var bodyParser = require('body-parser');
var messages = require('./messages-util');


app.use(bodyParser());

console.log('Server running.');

app.get('/', function (req, res) {
    fs.readFile('./client/index.html', function (err, data) {
        res.end(data);
    });
});

app.get('/messages', function (req, res, next) {

    if (!req.query.count || isNaN(req.query.count)) {
        var err = new Error('Not Found');
        err.status = 400;
        next(err);
    }
    else{
        messages.getMessages(req, res);
    }

});


app.post('/messages', function (req, res) {
    messages.addMessage(req, res);
});
app.delete('/messages/:id', function (req, res) {
    messages.deleteMessage(req, res);
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});