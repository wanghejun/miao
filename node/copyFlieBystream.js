let fs = require('fs')
let zlib = require('zlib')

console.log(process.pid)
let compressStream = zlib.createGzip()//压缩

let rs = fs.createReadStream('windows10.iso')
let ws = fs.createWriteStream('windows10_2.iso.zip')


rs.pipe(compressStream).pipe(ws)

// rs.on('data', data => {
//   if(ws.write(data) == false){//读取流的数据超过写入流时就停止数据读取
//     rs.pause()
//   }
// })

// ws.on('drain', () => {//drain事件指 写入流的缓冲区被清空的时候，就恢复读取流
//   rs.resume()
// })

// rs.on('end',() => {
//   ws.end()  
// })
