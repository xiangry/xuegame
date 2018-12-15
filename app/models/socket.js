'use strict'

class SocketModel {
    constructor(socket) {
        this.socket = socket;
    }

    getSocket(){return this.socket;};

    static newSocket(socket){
        return new SocketModel(socket);
    }
}

module.exports = SocketModel