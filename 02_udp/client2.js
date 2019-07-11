var dgram = require('dgram');
const fs = require('fs');
var client = dgram.createSocket('udp4');

client.on('close',() => {
  console.log('socket已关闭');
});

client.on('error',(err) => {
  console.log(err);
});

client.on('listening',() => {
  console.log('socket正在监听中...');
});

client.on('message',(msg, rinfo) => {
  console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
});

client.bind(41234, '192.168.1.16');
/*
// 接收消息
*/

/*var SendBuff = 'hello2';
var SendLen = SendBuff.length;
udp_client.send(SendBuff, 0, SendLen, 56780, '192.168.1.17');*/
