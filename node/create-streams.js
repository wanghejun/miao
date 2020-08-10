let fs = require('fs')
//拿到stream模块 
let { Readable,Writable,Duplex,Transform } = require('stream') 







let i = 0
let myReadable = new Readable({//创建一个可读流
  highWaterMark : 65536,//缓冲区大小  ,不写也是默认
  read(){
    i++
    this.push(String(i).repeat(8))
  }
})

// myReadable.on('data', data => {
//   console.log(data)
// })












function creatFileReadStream(path) { //创建一个读取流
  let fd = fs.openSync(path) 
  let pos = 0
  let chunkSize = 128

  return new Readable({
    highWaterMark:32768,
    read(size){
      let buf = Buffer.alloc(chunkSize)
      fs.read(fd,buf,0,chunkSize,pos,(err,bytesRead,buf) => {
        if(err){
           
        }else{
          this.push(buf.slice(0,bytesRead))
        }
      })
      pos += chunkSize
    }
  })
 }

let myRs = fs.createReadStream('人间词话.txt')
myRs.on('data', data => {
  console.log(data.toString())
})









function creatFileWriteStream(path) { 
 
  return  new Writable({//创建一个写入流
    highWaterMark:1024,
    write(chunk,encoding,cb){//处理数据
      fs.appendFile(path,chunk,cb)
    }
  })
 }

// let myWs = creatFileWriteStream('box.text')
// myWs.write('aaa')
// myWs.write('aaa')
// myWs.write('aaa')
// myWs.write('aaa')
// myWs.write('aaa')
// myWs.write('aaa')
// myWs.end()
