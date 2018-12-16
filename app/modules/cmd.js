require("../proto")
// var CMDS = {
//     [EMsgProto.Login]: require("./login"),
// }

var __praseMsg = JSON.parse;

class Cmd {
    constructor(data){

    }

    excute(){
        this["c2s_" + this.data.p]();
    }

    static createCmdObject(msg){
        var data = __praseMsg(msg);
        var cmd = new Cmd(data);
        return cmd;
    }
}

Cmd.prototype['c2s_' + EMsgProto.Login] = function () {
    console.log("-------------------", this.data);
}

module.exports = Cmd