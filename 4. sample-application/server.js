var express     = require('express'),
    fs          = require('fs'),
    http        = require('http'),
    events       = [],
    bodyParser  = require('body-parser');

try {
    events = JSON.parse(fs.readFileSync('client/data/events.json').toString());
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

app.get('/data/events/:id?', function (req, res) {
    var id = req.params.id;

    if (id) {   // if has id, send event by id
        res.send(events[id - 1], 200);
    } else {    // else send all the events
        res.send(events, 200);
    }
});

app.post('/data/events', function (req, res) {
    var event = req.body;

    event.id = events.length + 1; // set id

    event.status.isNew = false;
    event.status.isPublished = true;
    event.status.isCancelled = false;

    events.push(event);   // add event to collection

    res.send(event[event.id -1], 200);    // send the event back
});

app.put('/data/events/:id', function (req, res) {
    var id = req.params.id,
        event = req.body;

    event.status.isNew = false;
    event.status.isPublished = true;
    event.status.isCancelled = false;

    events[id - 1] = event;

    res.send(events[id - 1], 200);    // send the event back
});

app.delete('/data/events/:id', function (req, res) {
    var id = req.params.id,
        event;

    event = events[id - 1];
    event.status.isNew = false;
    event.status.isPublished = true;
    event.status.isCancelled = true;

    res.send(events[id - 1], 200);    // send the event back
});

/* Route: all others go to the defult client webapp for now */
app.get('*', function (req, res) {
    res.sendfile('./client/index.html');
});

server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});