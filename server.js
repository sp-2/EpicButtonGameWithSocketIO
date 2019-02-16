//Epic Button Game

var express = require("express");

var session = require('express-session');

var app = express();

app.use(session({secret: 'codingdojorocks'}));  // string for encryption

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var cnt = 0;

// root route

app.get('/', function (req, res){
    res.render('index');
});

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
 
socket.on( "push_button_clicked", function (data){
    cnt++;
    console.log( 'push button clicked!');
    io.emit( 'push_button_server_response', {response:  cnt});
})

socket.on( "reset_button_clicked", function (data){
    cnt = 0;
    console.log( 'reset button clicked!');
    io.emit( 'reset_button_server_response', {response:  cnt});
})

})