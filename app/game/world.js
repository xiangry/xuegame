'use strict'

require("../global")
require("../enum")
require("../message");

const DataControl = require("../data/data_control")
const SocketModel = require("../models/user")
const PlayerModel = require("./player")
const Cmd = require("../modules/cmd")

var XBWorld = function(){

}

XBWorld.prototype.loadDB = function(xbfn){
    this.dataControl = new DataControl();
    G.DataControl = this.dataControl;
    this.dataControl.init(xbfn);
}

XBWorld.prototype.setup = function(socketIO, xbfn){
    var world = this;

    world.socketIO = socketIO;
    world.players = [];
    world.sockets = [];
    world.time = null;

    this.loadDB(function () {
        xbfn();
    })
}

XBWorld.prototype.msgPlayer = function(target, msg){
    var socket;

    if (target.player) {
        socket = target;
        target = target.player;
    } else if (target.isPlayer) {
        socket = target.socket;
    } else {
        socket = target;
    }

    if(socket){
        socket.emit("s2ccmd", msg)
    }else{
        Glog("XueBa::", "send msg but no find socket", msg);
    }
}

XBWorld.prototype.playerConnect = function(socket){
    Glog("XueBa::", "player connect");
    var world = this;
    socket.player = PlayerModel.newPlayer(socket);
    socket.player.doLogin(socket, function () {
        world.players.push(socket);
    })
}

XBWorld.prototype.reciveData = function(socket, msg){
    Glog("XueBa::", "get client msg ", msg);

    var cmdObj = Cmd.createCmdObject(msg)
    cmdObj.excute(socket);
}

XBWorld.prototype.playerQuit = function(socket){
    Glog("XueBa::", "player Quit");
}

module.exports = new XBWorld()