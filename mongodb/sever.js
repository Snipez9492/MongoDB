
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');


var app = express();


app.use(express.static(__dirname + '/public'));


app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({
    extended: false
}));



var db = 'mongodb://localhost/mongoHeadlines';


mongoose.connect(db, function(err){

  if(err){
    console.log(err);
  } 
 
  else {
    console.log('mongoose connection is sucessful');
  }
});


var routes = require('./config/routes.js');


app.use('/', routes);
app.use('/test', routes);
app.use('/fetch', routes);
app.use('/gather', routes);
app.use('/check', routes);
app.use('/save', routes);
app.use('/delete', routes);



var port = process.env.PORT || 3000;


app.listen(port, function() {
    console.log("lisenting on port:" + port);
});
