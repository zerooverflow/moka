var express         = require('express');
var app             = express();
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var fs = require('fs');
var processRoutes = require('./process-routes.js')(app);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.listen(port);

console.log('The magic happens on port ' + port);

var api = JSON.parse(fs.readFileSync('./node-server/config.json', 'utf8'));
processRoutes.createApi(api.set);









