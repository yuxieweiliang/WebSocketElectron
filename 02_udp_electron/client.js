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

let length = 0;
const writeStream = fs.createWriteStream('./copyMessage.txt');
client.on('message',(msg, rinfo) => {
  // const readStream = fs.createReadStream(msg);
  console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
  client.send('消息已收到，我是客户端', rinfo.port, rinfo.address);
  // readStream.pipe(writeStream);
  writeStream.write(msg);
  console.log(length);

  length ++;
});

client.bind(41234);

