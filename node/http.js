let http = require('http')
var path = require('path')
let fs = require('fs')

let count = 0 //计数君
var baseDir = path.resolve('./') //当前文件夹

let port = 80 //端口号


let server = http.createServer((req, res) => { //创建一个服务器
  let url = decodeURIComponent(req.url)
  let targetPath = path.join(baseDir,url) //文件路径整合

  console.log(req.method, req.url)
  // console.log(req.headers)
  fs.stat(targetPath, (err, stat) => {
    if (err) {
      res.writeHead(400)
      res.end('page not found')
    } else {

      if (stat.isFile()) { //如果是文件

        fs.readFile(targetPath, (err, content) => {
          count++
          if (err) {
            res.end(err)
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html;charset=UTF-8'
            })
            res.write(content)
            res.write(`你是第${count}个访问者`)
            res.end() //结束响应
          }
        })

      } else if (stat.isDirectory()) {
        let indexPath = path.join(targetPath, 'index.html')
        fs.readFile(indexPath, (err, content) => {
          if (err && err.code == 'ENOENT') {
            res.writeHead(200, {
              'Content-Type': 'text/html;charset=UTF-8'
            })
            fs.readdir(targetPath, {
              withFileTypes: true
            }, (err, entries) => {

                let html = entries .length ? entries.map(entry => {
                  let slash = entry.isDirectory() ? '/' : ''
                  let stat = fs.statSync(path.join(targetPath, entry.name))
                  return `
                    <tr>
                      <td style='text-align:right'><span>${stat.size} B</span></td>
                      <td><a href = '${entry.name + slash}'>${entry.name + slash}</a></td>
                    </tr>`
                }).join('') : 'nothing in this directory'
                html = `
                    <h1>${req.url}</h1>
                    <table>${html}<table>
                    <footer>Node.js ${process.version} <a href =''>My Nuilbilitya</a> Server Running @</footer>
                  `
                res.write(html)
                res.end()

            })
          } else {
            res.end(content)
          }
        })


      }

    }


  })


})



//监听服务器端口
server.listen(port, () => {
  console.log('okay')
})
