require("../proto")
// var CMDS = {
//     [EMsgProto.Login]: require("./login"),
// }

var __praseMsg = JSON.parse;

class Cmd {
    constructor(data){
        this.data = data;
    }

    excute(socket){
        this["c2s_" + this.data.p](socket);
    }

    static createCmdObject(msg){
        var data = __praseMsg(msg);
        var cmd = new Cmd(data);
        return cmd;
    }
}

Cmd.prototype['c2s_' + EMsgProto.Login] = function (socket) {
    console.log("-------------------", this.data);
    var player = socket.player;
    player.loginWithData(this.data, function (user) {
        player.doLoginSuccess(socket, function () {
            player.doFirstData(socket, function () {

            })
        })
    })
}

module.exports = Cmd