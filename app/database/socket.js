'use strict'

class UserSocket {
    constructor(socket) {
        this.socket = socket;
    }

    getSocket(){
        return this.socket;
    }

    newModel(data){
        return new UserSocket(data);
    }
}

module.exports = UserSocket