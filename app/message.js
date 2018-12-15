require("proto")

var __stringify = JSON.stringify

function msg_s2c_login(){
    return __stringify({p: EMsgProto.Login, msg: "请登录"});
};

XBS2CMsgFuncs = {
    MsgLogin: msg_s2c_login
};
