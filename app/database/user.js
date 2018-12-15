'use strict';

var bcrypt      = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = "1";

const ExpModel = require("./exp")
const SocketModel = require("./socket")

class LocalUser {
    constructor(data) {
        this.username = data.username ||"undifien";
        this.password = "123456";
        this.socialId = data.socialId || "undefine";
        this.picture = DEFAULT_USER_PICTURE;
        this.displayName = "未命名";

        this.components = {}
        this.socket = nil
    }

    setUsername(username){this.username = username;};
    setPassword(password, next){this.password = password};

    setSocket(socket){this.socket = socket;};
    getSocket(){return this.socket;};

    addComponent(name, data){
        if(!this.components[name]){
            if(name == exp){
                var component = ExpModel.newModel(data)
                this.components[name] = component
            }
        }
    }

    toString(){
        return JSON.stringify({
            username: this.username,
            password: this.password,
            socialId: this.socialId,
            picture: this.picture,
            display: this.displayName,
        });
    }

    save(callback){
        var user = this;
        this.pre(function (err) {
            var sdata = user.toString();
            G.DataControl.setSaveData(user.username, sdata);
            callback(err, user);
        })
    }

    pre(next){
        var user = this;

        // ensure user picture is set
        if(!user.picture){
            user.picture = DEFAULT_USER_PICTURE;
        }

        // only hash the password if it has been modified (or is new)
        // if (!user.isModified('password')) {
        //     return next();
        // }

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    }

    static findOne(data, callback){
        return LocalUser.findById(data.username, callback)
    }

    static findById (username, callback){
        G.DataControl.getDataByKey(username, function (err, value) {
            if(err){return callback(err);}
            if(value){
                var data = JSON.parse(value)
                var user = new LocalUser(data)
                return callback(err, user);
            }else
            {
                return callback(err);
            }
        })
    }

    static newUser(data, callback){
        var user = new LocalUser(data);
        user.pre(function () {
            user.save(callback)
        })
    }

    static validatePassword(password, callback) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return callback(err);
            callback(null, isMatch);
        });
    };
}

module.exports = LocalUser;