const buf = Buffer.from([1, 2, 3]);
const buf2 = Buffer.from([4]);

console.log(buf);
console.log(buf2);
const allBuf = Buffer.concat([buf, buf2], buf.length + buf2.length);
console.log(allBuf);
