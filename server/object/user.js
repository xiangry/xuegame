/**
 * 用户数据
 * @param name
 * @constructor
 */


var XDataCenter = require("../data/date_center")

var crypto = require("crypto")
var md5 = crypto.createHash("md5");

var mk_salt = "!sA1+";
var pw_salt = "@a6H-;";

function User() {
    this.name = undefined;
    this.mk = undefined;
    this.exp = 0;
    this.addExp = 10;
    this.socket = undefined;
    this.sign = 0;
}

User.prototype.getMK = function () {
    return this.mk
}

User.prototype.Login = function (name, password) {
    if(XDataCenter.VerfyUser(name, password)){
        this.name = name;
        this.time = new Date().getTime();
        var str = this.name + this.time + mk_salt + Math.random();
        this.mk = str
            // md5.update(str).digest("hex");
        return true
    }
}


User.prototype.isLogin = function(){
    return (this.mk !== undefined)
}

User.prototype.Step = function(){
    this.exp += this.addExp;
}

User.prototype.GetExp = function(){
    return this.exp;
}

User.prototype.SetSocket = function(socket){
    this.socket = socket;
}

User.prototype.GetSocket = function(){
    return this.socket;
}

module.exports = User