const redis = require("redis")

const EErrorMsg = {
    NotFound: "not found",
}

const XuebaRdsHost = '127.0.0.1'
const XuebaRdsPort = 6379
const XuebaRdsOPTS = {}

const DataControl = function(){

}

DataControl.prototype.init = function(fn) {
    this.client = redis.createClient(XuebaRdsPort, XuebaRdsHost, XuebaRdsOPTS)
    this.client.on('ready', function () {
        Glog("XueBa::", "redis ready");
        fn();
    })
}

DataControl.prototype.getDataByKey = function(key, callback) {
    this.client.get(key, function (err, value) {
        if(err){
            callback(err);
        }else {
            return callback(err, value);
        }
    })
}

DataControl.prototype.setSaveData = function(key, data){
    this.client.set(key, data)
}

module.exports = DataControl
