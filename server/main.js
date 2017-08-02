const express = require('express')
var http = require('http'),
    url = require('url'),
    fs = require('fs');
const app = express();
var bodyParser = require('body-parser');
var messages=require('./messages-util');



app.use(bodyParser());




// http.createServer(function (req, res) {
//
//     var url_parts = url.parse(req.url);
//     console.log(url_parts);
//     if(url_parts.pathname == '/') {
//         // file serving
//         fs.readFile('./client/index.html', function(err, data) {
//             res.end(data);
//         });
//     } else if(url_parts.pathname.substr(0, 5) == '/poll') {
//         var count = url_parts.pathname.replace(/[^0-9]*/, '');
//         console.log(count);
//         if(messages.length > count) {
//             res.end(JSON.stringify( {
//                 count: messages.length,
//                 append: messages.slice(count).join(&quot;\n&quot;)+&quot;\n&quot;
//         }));
//         } else {
//             clients.push(res);
//         }
//     }
//
//
// }).listen(8080, 'localhost');
console.log('Server running.');
app.get('/', function (req, res) {
    fs.readFile('./client/index.html', function (err, data) {
        res.end(data);
    });
});

app.get('/messages', function (req, res) {
   messages.getMessages(req,res);
});


app.post('/messages', function (req, res) {
    messages.addMessage(req,res);
});
app.delete('/messages/:id', function (req, res) {
    messages.deleteMessage(req,res);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});