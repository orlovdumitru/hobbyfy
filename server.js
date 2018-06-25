
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var path = require('path');
var port = process.env.PORT || 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, '/hobbyfy/dist/hobbyfy')));

app.set('views', path.join(__dirname, '/hobbyfy/dist/hobbyfy'))

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(port, function(){
    console.log('port is runnig on ' + port);
})
