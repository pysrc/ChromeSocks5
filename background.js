var start = false;
// 监听来自popup页面的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.on && start === false) {
    start = true;
    var config = {
      value: {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "socks5",
            host: message.ip,
            port: parseInt(message.port)
          },
          bypassList: ["localhost", "127.0.0.1"]
        }
      },
      scope: "regular"
    };
    chrome.proxy.settings.set(config, function () { });
    sendResponse({ status: "on" });
  } else {
    start = false;
    console.log(message);
    chrome.proxy.settings.clear({ scope: "regular" }, function () { });
    sendResponse({ status: "off" });
  }
});