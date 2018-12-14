'use strict';

var bcrypt      = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = "/img/user.jpg";

/**
 * Every user has a username, password, socialId, and a picture.
 * If the user registered via username and password(i.e. LocalStrategy),
 *      then socialId should be null.
 * If the user registered via social authenticaton,
 *      then password should be null, and socialId should be assigned to a value.
 * 2. Hash user's password
 *
 */
var LocalUser = function (data) {
    this.username = "xiangry";
    this.password = "123456";
    this.socialId = data.socialId || "undefine";
    this.picture = DEFAULT_USER_PICTURE;

    this.is_modified = false;
}

/**
 * Before save a user document, Make sure:
 * 1. User's picture is assigned, if not, assign it to default one.
 * 2. Hash user's password
 */
LocalUser.prototype.pre = function(next){
    var user = this;

    // ensure user picture is set
    if(!user.picture){
        user.picture = DEFAULT_USER_PICTURE;
    }

    // only hash the password if it has been modified (or is new)
    if (!user.is_modified) {
        return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            this.is_modified = true;
            next();
        });
    });
}

/**
 * 保存玩家信息
 */
LocalUser.prototype.save = function(callback){
    var user = this;
    this.pre(function (err) {
        var sdata = user.toStrData();
        G.DataControl.setSaveData(user.username, sdata);
        callback(err, user);
    })
}

LocalUser.prototype.toStrData = function(callback){
    return JSON.stringify({
        username: this.username,
        password: this.password,
        socialId: this.socialId,
        picture: this.picture
    })
}

LocalUser.prototype.isModified = function(){

}

LocalUser.findOne = function(data, callback){
    LocalUser.findById(data.socialId, callback)
}

LocalUser.findById = function(id, callback){
    G.DataControl.getDataByKey(id, function (err, value) {
        if(err == null){return callback(err);}
        console.log("findById  value =======  ", value)
        var user = new LocalUser({socialId:id})
        user.per(function () {
            return callback(err, user);
        })
    })
}

/**
 * Create an Instance method to validate user's password
 * This method will be used to compare the given password with the passwoed stored in the database
 */
LocalUser.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

module.exports = LocalUser;