const redis = require("redis")

const DataControl = function(){

}

DataControl.prototype.init = function() {

    this.client = redis.createClient(6379, "localhost")
    this.client.set('hello', JSON.stringify({a:1, b:2}))
    this.client.get('hello', function (err, value) {
        console.log("redis value ", value)
    })
}

DataControl.prototype.getDataByKey = function(key, callback) {
    this.client.get(key, function (err, value) {
        if(err){
            callback(err);
        }else {
            return callback(err, value);
        }
        console.log("getDataByKey key =====  ", value.a)
    })
}

DataControl.prototype.setSaveData = function(key, data){
    this.client.set(key, data)
}

module.exports = DataControl
