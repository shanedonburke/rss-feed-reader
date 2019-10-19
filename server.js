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
            res.send(result);
        },
        error => {
            res.send(error);
        }
    );
});

app.listen(port, function () { return console.log("Listening on port " + port); });