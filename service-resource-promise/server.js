var express     = require('express'),
    fs          = require('fs'),
    http        = require('http'),
    notes       = [],
    bodyParser  = require('body-parser');

try {
    notes = JSON.parse(fs.readFileSync('data/notes.json').toString());
} catch (error) {
    console.error('There was an error reading the file.\n' + error.message + '\nServer stopped.');
    process.exit(1);
}

var app, server;

app = express();

/* Configure Express */
app.set('port', 3000);
//app.use(express.bodyParser());

// Any HTTP request will be satisfied using the content under './client'
app.use(express.static('./client'));
app.use(bodyParser());

app.get('/data/:resource/:id?', function (req, res) {
    var resource = req.params.resource,
        id = req.params.id;

    if (id) {
        res.send(notes[id], 200);
    } else {
        res.send(notes, 200);
    }
});

app.post('/data/:resource/', function (req, res) {
    notes.push(req.body);
    res.send(notes, 200);
});

/* Route: all others go to the defult client webapp for now */
app.get('*', function (req, res) {
    res.sendfile('./client/index.html');
});

server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});