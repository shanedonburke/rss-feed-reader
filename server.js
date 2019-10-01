var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/hello', function (req, res) {
    res.send({ express: 'Hello From Express' });
});
app.post('/api/world', function (req, res) {
    console.log(req.body);
    res.send("I received your POST request. This is what you sent me: " + req.body.post);
});
app.listen(port, function () { return console.log("Listening on port " + port); });
