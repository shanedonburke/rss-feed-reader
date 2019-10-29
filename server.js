const feedList = require("./src/feedList");

var express = require('express');
var $path = require('path') ;
var bodyParser = require('body-parser');

 
var app = express();
var port = process.env.PORT || 5000;
const publicDir = $path.resolve('./client/public');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/public')) ;
 
app.get('/', function (req, res) {
    res.sendFile($path.resolve(publicDir, 'index.html'));
});
app.post('/add-feed', function (req, res) {
    const feedURL = req.body.feedURL;
    feedList.addFeed(feedURL).then(
        result => {
            res.status(200).send(result);
        },
        error => {
            res.status(500).send(error);
        }
    );
});

app.get('/get-feed-list', function(req, res) {
    let feedListPromise = feedList.getFeedList();

    feedListPromise.then(
        feedList => {
            res.status(200).send(JSON.stringify(feedList));
        },
        error => {
            res.status(500).send(error);
        }
    );
});

app.listen(port, function () { return console.log("Listening on port " + port); });