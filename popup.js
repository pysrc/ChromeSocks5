var power = document.getElementById("power");
var host = document.getElementById("host");
chrome.storage.local.get("powerStatus", function(data) {
    if (data.powerStatus === true) {
        power.checked = true;
    } else {
        power.checked = false;
    }
});
chrome.storage.local.get("host", function(data) {
    if (data.host) {
        host.value = data.host;
    }
});
power.addEventListener("change", function() {
    if(!host.value) {
        alert("no socks5 host");
        return;
    }
    var [ip, port] = host.value.split(":");
    chrome.storage.local.set({ "powerStatus": power.checked });
    chrome.storage.local.set({ "host": host.value });
    // 发送消息给background页面
    chrome.runtime.sendMessage({"on": power.checked, "ip": ip, 'port': port}, function(response) {
        console.log(response);
    });
});