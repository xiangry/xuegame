XConfig = require("./app/config/config")
XEnum = require("./app/enum")
XLog = require("./app/util/log")

require("./app/global")

User = require("./app/data/user")

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
    res.sendFile(__dirname + '/../index1.html');
});

var allUsers = []

function GetUser(socket){
    allUsers.forEach(function (user, index) {
        // user = allUsers.forEach()
        if(user.GetSocket() == socket){
            return index
        }
    })
}

IOServer.on('connection', function(socket){
    console.log('one user connected');

    let user = new User()
    user.Login("xiangry", "123456")
    if(user.isLogin()){
        user.SetSocket(socket)
        allUsers.push(user)

        socket.emit("s2c_msg", "xxxxx")

        socket.on('disconnect', function(){
            console.log('user disconnected');
            let index = GetUser(socket)
            if (index!=-1){
                allUsers.splice(index, 1)
            }
        });

        socket.on('cs_message', function(msg){
            console.log('message: ' + msg);
        });
    }
});

http.listen(10101, function(){
    console.log('listening on *:10101');
});

XSchedule.scheduleJob('* * * * * *', function (data) {
    // console.log("-----------------------------------------------------" + allUsers.length)
    for (var index in allUsers){
        let user = allUsers[index];
        user.Step()
        user.GetSocket().emit("s2c_msg", user.GetExp());
    }
})



// var UserModel = require("./app/models/user")
// UserModel.findOrCreate({username:"xiang"}, function (err, user) {
//     console.log("username === ", user.username)
//     console.log(user)
// })

UserModel.findOrCreate({username:"liliy"}, function (err, user) {
    console.log("username === ", user.username)
    console.log(user)
})
