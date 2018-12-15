
XLogLevel = XEnum.ELogLevel.Debug

/**
 * 打印日志
 * @param tag   日志标签
 * @param msg   日志
 * @param level 日志等级
 * @constructor
 */
function XLog(tag, msg, level) {
    if (level == undefined || level >= XLogLevel){
        console.log(tag, msg);
    }
}

module.exports = XLog
