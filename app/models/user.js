'use strict';

var userModel = require('../database/user');

var create = function (data, callback){
    userModel.newUser(data, callback)
};

var findOne = function (data, callback){
    Glog("function ==============", data);
    userModel.findOne(data, callback);
}

var findById = function (id, callback){
    userModel.findById(id, callback);
}

/**
 * Find a user, and create one if doesn't exist already.
 * This method is used ONLY to find user accounts registered via Social Authentication.
 */
var findOrCreate = function(data, callback){
    findOne({'username': data.username}, function(err, user){
        if(err) { return callback(err); }
        if(user){
            return callback(err, user);
        } else {
            var userData = {
                username: data.username,
                picture: null
            };

            console.log("create user ", userData)

            create(userData, function(err, newUser){
                callback(err, newUser);
            });
        }
    });
}

module.exports = {
    create,
    findOne,
    findById,
    findOrCreate,
};
