const feedList = require("./src/feedList");
const fs = require('fs');
var express = require('express');
var $path = require('path') ;
var bodyParser = require('body-parser');

 
var app = express();
var port = process.env.PORT || 5000;
const publicDir = $path.resolve('./public');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
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

app.post('/get-articles', function(req, res) {
    let articlesPromise = feedList.getArticles();

    articlesPromise.then(
        articles => {
            res.status(200).send(JSON.stringify(articles));
        },
        error => {
            res.status(500).send("You aren't subscribed to any feeds!");
        }
    );
});

app.post('/delete-feed', function(req, res) {
    const url = req.body.url;
    let deletePromise = feedList.deleteFeed(url);

    deletePromise.then(
        success => {
            res.status(200).send("Success!");
        },
        error => {
            res.status(500).send("Error deleting feed.");
        }
    )
});

app.listen(port, function () { return console.log("Listening on port " + port); });