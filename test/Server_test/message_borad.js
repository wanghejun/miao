let net = require('net')

let server = net.createServer()
let port = 5555

var msg = [
  {
    name:'悟空',
    content:'妖怪哪里跑',
    timeTp:1594648455422
  },
  {
    name:'八戒',
    content:'大师兄，妖怪被师傅抓走了',
    timeTp:1594648405422
  }
]
server.on('connection', conn => {
   global.conn = conn

   conn.on('data', data => {
     var d = data.toString()
     var [header,body] = d.split('\r\n\r\n')
     var [firstline,...lines] = header.split('\r\n')
     var [method,path] = firstline.split(' ')

     if(method == 'POST'){
       var a = parseQueryString(body)
       a.timeTp = Date.now()
       msg.push(a)
       //用get请求跳回首页
      conn.write('HTTP/1.1 302 Moved Templajfowiehf\r\n')
      conn.write('Location: /\r\n')
      conn.write('\r\n')
      conn.end()
      return
     }
  
     conn.write('HTTP/1.1 200 OK\r\n')
     conn.write('COntent-Type:text/html\r\n\r\n')
    
  
     conn.write(`
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <style>
          *{
            margin: 0;
          }
          body{
            height: 100vh;
            background: linear-gradient(160deg,#54a0ff,#341f97);
          }
          form{
            width: 300px;
            margin: 100px auto;
            text-align: center;
            font-weight: bold;
          }
          form > p:nth-child(2){
            vertical-align: middle;
          }
          form > p:last-child input{
            width: 200px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            margin: 0 auto;
          }
          body > div{
            text-align: center;
            margin: 20px;
          }
          body > div > h2{
            color: orange;
          }
       </style>
     </head>
     <body>
        <form action="" method="POST">
          <p> Name: <br><input type="text" name="name" id=""></p>
          <p> Message↓↓↓ <textarea name="content" id="" cols="30" rows="5"></textarea></p>
          <p><input type="submit" name="" id=""></p>
        </form>
        <hr>
        <div><h1>留言板</h1></div>
        ${
         Array.from(msg).reverse().map(it => {
            return `<div>
              <h2>${it.name}<span>${new Date(it.timeTp).toLocaleString()}</span></h2>
              <p>${it.content}</p>
            </div>
            `
          }).join('')
        }
     `)
      // msg.forEach( it => {
      //   conn.write(`
      //     <div>
      //       <h2>${it.name}</h2>
      //       <span>${new Date(it.timeTp).toLocaleString()}</span>
      //       <p>${it.content}</p>
      //     </div>
      //   `)
      // })

     conn.write(`
        </body>
     </html>
     `)
     
     conn.end()//切断连接
   })

   conn.on('error',() =>{})//监听报错

})

server.listen(port,() => {
  console.log(`${port} 端口监听成功`)
})

function parseQueryString(str) { 
  return str.split('&').reduce((result,pair) => {
    var [key,val] = pair.split('=')
    result[key] = decodeURIComponent(val)
    return result
  },{})
 }
