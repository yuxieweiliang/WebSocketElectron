const dgram = require('dgram');
const fs = require('fs');


//创建 udp server
const udp_server = dgram.createSocket('udp4');

// 监听端口
udp_server.on('listening', function () {
  console.log('udp server linstening 8060.');
});


//接收消息
udp_server.on('message', function (msg, rinfo) {
  console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
  // const writeStream = fs.createReadStream('./Screen.mp4', { highWaterMark: 100 });
console.log('message')
});

//错误处理
udp_server.on('error', function (err) {
  console.log('some error on udp server.');
  udp_server.close();
});

//错误处理
udp_server.on('listening', function (err) {
  const msg = '大家好啊，我是服务端.';
  udp_server.setBroadcast(!0);// 开启广播
  console.log(`开启广播`);
  udp_server.setTTL(128);
  setTimeout(function() {
    udp_server.send(msg, 41234, '192.168.1.255');
  }, 3000)
});

udp_server.bind(8060);
