'use strict'

class XBPlayer {
    constructor(socket){
        this.socket = socket
        this.isPlayer = true;
        this.isLogined = false;
    }

    doLogin(s, xbfn){
        var msg = XBS2CMsgFuncs.MsgLogin()
        World.msgPlayer(s, msg)
        xbfn()
    }

    static newPlayer(socket){
        return new XBPlayer(socket);
    }
}

module.exports = XBPlayer