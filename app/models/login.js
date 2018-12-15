'use strict';

class LoginModel {
    constructor(socket){
        this.socket = socket;
    }

    getSocket(){return this.socket;};
}

module.exports = LoginModel