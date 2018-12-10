var express = require('express')
var path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, "")))
app.use(express.static(path.join(__dirname, "app")))
app.use(express.static(path.join(__dirname, "app/js")))
app.use(express.static(path.join(__dirname, "app/css/")))

console.log("__dirname" + __dirname)

// app.get('/', function(req, res){
//     console.log(req.body)
//     res.sendFile(__dirname + '/index.html');
// });


var temp_user = new Array()
var real_user = new Array()


io.on('connection', function(socket){
    console.log('one user connected');

    temp_user[temp_user.length] = socket

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('cs_message', function(msg){
        console.log('message: ' + msg);
    });

    socket.emit("sc_message", "欢迎来到大学霸")
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

