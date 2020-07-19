let net = require('net')

let server = net.createServer()
let port = 5555

server.on('connection', conn => {
   globalThis.conn = conn

   conn.on('data',data => {
     console.log(data.toString())
   })

   conn.on('error',() =>{})//监听报错

   conn.write('HTTP/1.1 200 OK\r\n')
   conn.write('COntent-Type:text/html\r\n\r\n')
   conn.write(`<h1>it works</h1> <p>today is ${new Date().toLocaleString()}</p>`)
   conn.write('<img src = "./img/96.png" />')

  })
  conn.end()//切断连接

server.listen(port,() => {
  console.log(`${port} 端口监听成功`)
})
