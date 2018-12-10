XConfig = require("./config/config")
XEnum = require("./enum")
XLog = require("./util/log")

User = require("./object/user")

const XSchedule = require('node-schedule');


var express = require('express')
var path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(path.join(__dirname, "")))
app.use(express.static(path.join(__dirname, "../")))
app.use(express.static(path.join(__dirname, "../app")))
app.use(express.static(path.join(__dirname, "../app/js")))
app.use(express.static(path.join(__dirname, "../app/css/")))


app.get('/', function(req, res){
    console.log(req.body)
    res.sendFile(__dirname + '/../index.html');
});



var online_user = {}
var socket_user = {}



io.on('connection', function(socket){
    console.log('one user connected');

    var user = new User()
    user.Login("xiangry", "123456")
    if(user.isLogin()){
        user.SetSocket(socket)
        online_user[socket] = user

        socket.on('disconnect', function(){
            console.log('user disconnected');
            delete online_user[socket]
        });
        socket.on('cs_message', function(msg){
            console.log('message: ' + msg);
        });

    }
    console.log(user.getMK())
});



http.listen(10101, function(){
    console.log('listening on *:10101');
});

XSchedule.scheduleJob('* * * * * *', function (data) {
    var user = undefined
    for (var key in online_user){
        user = online_user[key]
        user.Step()
        user.GetSocket().emit("sc_message", user.GetExp());
    }
    // console.log(Object.keys(online_user))
})
