let http = require('http')
var path = require('path')
let fs = require('fs')
let lodash = require('lodash')

let count = 0 //计数君
var baseDir = path.resolve('./') //当前文件夹

let port = 80 //端口号


let server = http.createServer((req, res) => { //创建一个服务器
  let url = decodeURIComponent(req.url)
  let targetPath = path.join(baseDir,url) //文件路径整合

  if(!targetPath.startsWith(baseDir)){
    res.writeHead(401)
    res.end('401 unauthorized')
    return 
  }
  console.log(req.method, req.url)
  // console.log(req.headers)
  fs.stat(targetPath, (err, stat) => {
    if (err) {
      res.writeHead(400)
      res.end('page not found')
    } else {

      if (stat.isFile()) { //如果是文件
        fs.createReadStream(targetPath).pipe(res)
        // fs.readFile(targetPath, (err, content) => {
        //   count++
        //   if (err) {
        //     res.end(err)
        //   } else {
        //     res.writeHead(200, {
        //       'Content-Type': 'text/html;charset=UTF-8'
        //     })
        //     res.write(content)
        //     res.write(`</br>`)
        //     res.write(`你是第${count}个访问者`)
        //     res.end() //结束响应
        //   }
        // })

      } else if (stat.isDirectory()) {
        let indexPath = path.join(targetPath, 'index.html')
        fs.stat(indexPath,(err,stat) => {
          if(err) {
            if(!req.url.endsWith('/')){
              res.writeHead(302, {
                'Location':req.url + '/'
              })
              res.end()
              return
            }

            res.writeHead(200, {
              'Content-Type': 'text/html;charset=UTF-8'
            })
            fs.readdir(targetPath, {
              withFileTypes: true
            }, (err, entries) => {
              let pageHtml = readerIndexPage(entries,targetPath,url)
                // let html = entries .length ? entries.map(entry => {
                //   let slash = entry.isDirectory() ? '/' : ''
                //   let stat = fs.statSync(path.join(targetPath, entry.name))
                //   return `
                //     <tr>
                //       <td style='text-align:right'><span>${stat.size} B</span></td>
                //       <td><a href = '${entry.name + slash}'>${entry.name + slash}</a></td>
                //     </tr>`
                // }).join('') : 'nothing in this directory'
                // html = `
                //     <h1>${req.url}</h1>
                //     <table>${html}<table>
                //     <footer>Node.js ${process.version} <a href =''>My Nuilbilitya</a> Server Running @</footer>
                //   `
                res.write(pageHtml)
                res.end()

            })
          }else{
            res.writeHead(200,{
              'Content-Type':'text/html'
              })
            fs.createReadStream(indexPath).pipe(res)
          }
        })
        // fs.readFile(indexPath, (err, content) => {
        //   if (err && err.code == 'ENOENT') {
        //     if(!req.url.endsWith('/')){
        //       res.writeHead(302, {
        //         'Location':req.url + '/'
        //       })
        //       res.end()
        //       return
        //     }

        //     res.writeHead(200, {
        //       'Content-Type': 'text/html;charset=UTF-8'
        //     })
        //     fs.readdir(targetPath, {
        //       withFileTypes: true
        //     }, (err, entries) => {
        //       let pageHtml = readerIndexPage(entries,targetPath,url)
        //         // let html = entries .length ? entries.map(entry => {
        //         //   let slash = entry.isDirectory() ? '/' : ''
        //         //   let stat = fs.statSync(path.join(targetPath, entry.name))
        //         //   return `
        //         //     <tr>
        //         //       <td style='text-align:right'><span>${stat.size} B</span></td>
        //         //       <td><a href = '${entry.name + slash}'>${entry.name + slash}</a></td>
        //         //     </tr>`
        //         // }).join('') : 'nothing in this directory'
        //         // html = `
        //         //     <h1>${req.url}</h1>
        //         //     <table>${html}<table>
        //         //     <footer>Node.js ${process.version} <a href =''>My Nuilbilitya</a> Server Running @</footer>
        //         //   `
        //         res.write(pageHtml)
        //         res.end()

        //     })
        //   } else {
        //     res.writeHead(200,{
        //       'Content-Type':'text/html'
        //       })
              
        //     res.end(content)
        //   }
        // })


      }

    }


  })


})



//监听服务器端口
server.listen(port, () => {
  console.log('okay')
})

let nimeMap ={
  'js':'application/javascript',
  'default':'application/octet-strem'
}
function getMinType(fullName) { 
  let extName = path.extname(fullName)
  if(extName in nimeMap){
    return nimeMap[extName]
  }else{
    return nimeMap['default']
  }
 }

let pageTpl = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>Index of <%= url %></h1>
    <table>
      <tbody>
        <% entries.forEach((entry,idx) => {
            let slash = entry.isDirectory() ? '/' : ''
          %>
          <tr>
            <td><%= entry.size %></td>
            <td><a href = '<%= entry.name %><%= slash %>'><%= entry.name %><%= slash %></a></td>
          </tr>
        <% }) %>
      </tbody>
    </table>

    <footer>
      <p>Node.js ${process.version} <a href =''>My Nuilbilitya</a> Server Running @</p>
    </footer>
  </body>
  </html>

`
let compiledTpl = lodash.template(pageTpl)
 function readerIndexPage(entries,parentDir,url) { 
  return compiledTpl({entries,parentDir,url})
  }
