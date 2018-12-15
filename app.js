var express = require('express')
var path = require('path')
var app = express();
var server = require('http').Server(app);

app.use(express.static(path.join(__dirname, "")))
app.use(express.static(path.join(__dirname, "../")))
app.use(express.static(path.join(__dirname, "../client")))
app.use(express.static(path.join(__dirname, "../client/js")))
app.use(express.static(path.join(__dirname, "../client/css/")))



app.get('/', function(req, res){
    console.log("url", req.url)
    res.sendFile(__dirname + '/client/index.html');
});


app.get('/*', function (req, res) {
    console.log("url client", __dirname + req.url)
    res.sendFile(__dirname + req.url);
})

const XuebaGamePort = 10101

World = require("./app/game/world")

var io = require('socket.io')(server);
World.setup(io, function () {

    io.on('connection', function (socket) {

        Glog("XueBa::", "one user connect ");
        
        World.playerConnect(socket);

        socket.on('c2scmd', function (msg) {
            World.reciveData(socket, msg);
        });

        socket.on('disconnect', function () {
            World.playerQuit(socket, function () {
                socket.leave("game");
                socket.disconnect();
            })
        });
    });

    server.listen(XuebaGamePort, function(){
        Glog('listening on *:', XuebaGamePort);
    });
});
