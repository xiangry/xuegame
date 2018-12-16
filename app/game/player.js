'use strict'

const UserModel = require("../models/user");

class XBPlayer {
    constructor(socket){
        this.isPlayer = true;
        this.user = null;
        this.isLogined = false;
    }

    doLogin(s, xbfn){
        var msg = XBS2CMsgFuncs.MsgLogin()
        World.msgPlayer(s, msg)
        xbfn()
    }

    doLoginSuccess(s, xbfn){
        var msg = XBS2CMsgFuncs.MsgLoginSuccess()
        World.msgPlayer(s, msg)
        xbfn()
    }

    doFirstData(s, xbfn){
        var msg = XBS2CMsgFuncs.FirstData(this.user.toString());
        World.msgPlayer(s, msg)
        xbfn()
    }


    loginWithData(data, callback){
        Glog("loginWithData ==============", data);
        var self = this;
        UserModel.findOne({
            username: data.account,
            password: data.password,
        }, function (err, user) {
            Glog("err ==============", err);
            Glog("user ==============", user);

            if (err) {Glog("XueBa:: find user ", err);return;};
            if (user){
                self.user = user;
                callback(user)
            }
        });


    }

    static newPlayer(socket){
        return new XBPlayer(socket);
    }
}

module.exports = XBPlayer