'use strict';

var userModel = require('../database/user');

var create = function (data, callback){
    var newUser = new userModel(data);
    newUser.save(callback);
};

var findOne = function (data, callback){
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
    findOne({'socialId': data.id}, function(err, user){
        if(err) { return callback(err); }
        if(user){
            return callback(err, user);
        } else {
            var userData = {
                username: data.displayName,
                socialId: data.id,
                picture: null
            };

            console.log("create user ", userData)

            create(userData, function(err, newUser){
                console.log("newUser === ", newUser)
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
