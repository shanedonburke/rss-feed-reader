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
    const jsonFeed = $path.join(publicDir, '/data/currentFeed.json');
    fs.truncate(jsonFeed, 0, () => {
        fs.writeFileSync(jsonFeed, JSON.stringify(req.body.feed, null, 2), {encoding: 'utf8',flag:'w'});
    });
    
    // const feedURL = req.body.feedURL;
    // const feedBody = req.body.feed;
    // feedList.addFeed(feedBody).then(
    //     result => {
    //         res.status(200).send(result);
    //     },
    //     error => {
    //         res.status(500).send(error);
    //     }
    // );
});

// app.get('/get-feed-list', function(req, res) {
//     let feedListPromise = feedList.getFeedList();

//     feedListPromise.then(
//         feedList => {
//             res.status(200).send(JSON.stringify(feedList));
//         },
//         error => {
//             res.status(500).send(error);
//         }
//     );
// });

app.get('/get-feed-list', (req, res) => {
    const jsonFeed = $path.join(publicDir, '/data/currentFeed.json');
    const data = fs.readFileSync(jsonFeed);
    const json = JSON.parse(data);
    res.type('json').send(json);
});

app.listen(port, function () { return console.log("Listening on port " + port); });