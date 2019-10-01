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

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
