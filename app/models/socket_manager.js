'use strict'

class SocketModel {
    constructor(socket) {
        this.socket = socket;
        this.user = null;
    }

    getSocket(){return this.socket;};
    newSocket(socket){return new SocketModel(socket);}
}

module.exports = SocketModel