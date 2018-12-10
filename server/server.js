XConfig = require("./config/config")
XEnum = require("./enum")
XLog = require("./util/log")

User = require("./object/user")

const XSchedule = require('node-schedule');

var express = require('express')
var path = require('path')
var app = express();
var http = require('http').Server(app);
var IOServer = require('socket.io')(http);


app.use(express.static(path.join(__dirname, "")))
app.use(express.static(path.join(__dirname, "../")))
app.use(express.static(path.join(__dirname, "../app")))
app.use(express.static(path.join(__dirname, "../app/js")))
app.use(express.static(path.join(__dirname, "../app/css/")))


app.get('/', function(req, res){
    console.log(req.body)
    res.sendFile(__dirname + '/../index.html');
});


let allSockets = []

var online_user = {}
var allUsers = []

IOServer.on('connection', function(socket){
    console.log('one user connected');

    let user = new User()
    user.Login("xiangry", "123456")
    if(user.isLogin()){
        user.SetSocket(socket)
        allSockets.push(socket)
        allUsers.push(user)
        online_user[socket] = user

        socket.on('disconnect', function(){
            console.log('user disconnected');
            let index = allSockets.indexOf(socket)
            if (n!=-1){
                allSockets.splice(index, 1)
                delete online_user[socket];
            }
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
    console.log("-----------------------------------------------------")
    for (var index in allUsers){
        let user = allUsers[index];
        console.log(user.getMK())
        user.Step()
        user.GetSocket().emit("sc_message", user.GetExp());
    }
})

