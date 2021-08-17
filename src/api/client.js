import { QWebChannel } from "./qwebchannel.js";
const getQtContext = () => {
  return new Promise((resolve, reject) => {
    if (window.globalQtContext) {
      return resolve(window.globalQtContext);
    }

    if (typeof qt != "undefined") {
      new QWebChannel(qt.webChannelTransport, function(channel) {
        window.globalQtContext = channel.objects.bdclient;
        return resolve(window.globalQtContext);
      });
    } else {
      return reject("qt is undefined");
    }
  });
};

// window.recvMessage = function(msg) {
//   alert("接收到Qt发送的消息：" + msg);
//   console.log("client:" + msg);
//   return new Promise((resolve, reject) => {
//     // console.log(msg);
//     if (msg != "undefined") {
//       resolve(msg);
//     }
//     // console.log();
//   });
// };

export const sendMessage = msg => {
  getQtContext().then(context => context.onMsg(JSON.stringify(msg)));
};
