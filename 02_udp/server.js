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
  //
  console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
  /**/
});

//错误处理
udp_server.on('error', function (err) {
  console.log('some error on udp server.');
  udp_server.close();
});

function sendFile() {
  const writeStream = fs.createReadStream('./someMessage.txt', { highWaterMark: 1000 });
  const buf2 = Buffer.from([4]);
  // writeStream.pipe();
  writeStream.on('data', function(buffer) {
    udp_server.send(buffer, 41234, '192.168.1.255');
  });
  writeStream.on('end', function() {
    udp_server.send(buf2, 41234, '192.168.1.255');
  });
}

//错误处理
udp_server.on('listening', function (err) {
  // 开启广播
  udp_server.setBroadcast(!0);
  udp_server.setTTL(128);

  setTimeout(function() {
    sendFile();
    // udp_server.send(allBuf, 41234, '192.168.1.255');
  }, 1000)
});

udp_server.bind(8060);
