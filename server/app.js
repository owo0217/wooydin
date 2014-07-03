var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//net : use net module
var net = require('net');
var socket = require('./src/socket/socket');
//mongo : use mongoose
var mongoose = require('mongoose');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/uwd');//'mongodb://luxstellarm:qufqlc12@kahana.mongohq.com:10054/app27013508' );
//mongo : connect to mongoDB
//mongoose.connect('mongodb://localhost/uwd');
mongoose.connect('mongodb://luxstellarum:qufqlc12@kahana.mongohq.com:10062/app27014310' || 'mongodb://localhost/uwd');

var server = app.listen(10512, function(){
    console.log("listening port on 10512");
});

// //socket : make socket.io object
// var io = require('socket.io').listen(server);
// io.sockets.on('connection', function(sock){
//     console.log('Socket Connected : ', sock);
// });

module.exports = app;
