/**
 *数据中心
 *
 */

var user_data = {
    "xiangry":"123456",
}

var XEneum = require("../enum")

/**
 * 获取密码
 * @param name
 * @returns {*}
 * @constructor
 */
GetUser = function (name) {
    for (var _name in user_data){
        if (_name == name){
            return user_data[name]
        }
    }
    return XEneum.ESpecialValue.NotFound
}

/**
 * 保存账户密码
 * @param name
 * @param password
 * @constructor
 */
SaveUser = function (name, password) {
    user_data[name] = password;
}

/**
 * 验证玩家
 * @param name
 * @param password
 * @returns {boolean}
 * @constructor
 */
VerfyUser = function (name, password) {
    return password == GetUser(name)
}


module.exports = {
    GetUser: GetUser,
    SaveUser: SaveUser,
    VerfyUser: VerfyUser
}