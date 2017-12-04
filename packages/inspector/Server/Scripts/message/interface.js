"use strict";
function formatLog(type, message, vmessage) {
    var buffer = [];
    buffer.push(type);
    if (type.length < 10) {
        for (var i = type.length; i < 10; i++) {
            buffer.push(" ");
        }
    }
    buffer.push(" : ");
    if (vmessage) {
        if (vmessage.metadata && vmessage.metadata.sessionId)
            buffer.push(vmessage.metadata.sessionId + " ");
    }
    if (message)
        buffer.push(message + " ");
    if (vmessage) {
        if (vmessage.metadata) {
            if (vmessage.metadata.pluginID) {
                buffer.push(vmessage.metadata.pluginID);
                if (vmessage.command)
                    buffer.push(":" + vmessage.command);
                buffer.push(" ");
            }
            if (vmessage.metadata.clientId) {
                buffer.push(vmessage.metadata.clientId);
            }
        }
    }
    return buffer.join("");
}
exports.formatLog = formatLog;
