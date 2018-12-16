require("./proto")

var __stringify = JSON.stringify

function msg_s2c_login(){
    return __stringify({p: EMsgProto.Login, msg: "请登录"});
};

function msg_s2c_login_success(){
    return __stringify({p: EMsgProto.LoginSuccess, msg: "登录成功"});
};

function msg_s2c_first_data(msg){
    return __stringify({p: EMsgProto.FirstData, msg});
};

XBS2CMsgFuncs = {
    MsgLogin: msg_s2c_login,
    MsgLoginSuccess: msg_s2c_login_success,
    FirstData: msg_s2c_first_data,
};
