const redis = require("redis")

const DataControl = function(){

}

DataControl.prototype.init = function() {
    this.client = redis.createClient(6379, "localhost")
    this.client.set('hello', {a:1, b:2}.toString())
    this.client.get('hello', function (err, value) {
        console.log("redis value ", value)
    })
}

DataControl.prototype.getDataById = function(id, callback) {
    this.client.get(id)
}

module.exports = DataControl
