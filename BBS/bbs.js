const express = require('express')//导入express模块
const app = express()//实列出一个express
const fsp = require('fs').promises
const path = require('path')
const cookieParser = require('cookie-parser')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const multer = require('multer')//头像上传库
const svgCaptcha = require('svg-captcha');//SVG验证码库
const nodemailer = require('nodemailer')//邮箱库

const config = {//SMTP客户端配置
  service: "QQ",
  auth: {
      // 发件人邮箱账号
      user: '865876163@qq.com',
      //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
      pass: 'zrbgqvbtbiovbefi'
  }
}

//创建一个SMTP客户端配置对象
const transporter = nodemailer.createTransport(config)

let port = 8080 //端口号

const upLoader = multer({dest:__dirname + '/upLoads/'})//头像存放地址

let db //数据库
sqlite.open({//连接数据库
  filename:__dirname + '/bbs.db',//数据库路径
  driver:sqlite3.Database//
}).then(value => {
  db = value
})


app.disable('x-powered-by')//禁用这个响应头，原因 => 它显示自己服务器构建的名字
app.locals.pretty = true //返回的页面源码不压缩
app.set('views',__dirname + '/views')//模板存放地址


app.use((req,res,next) => {//打印出请求方法和URL
  console.log(req.method,req.url)
  next()
})


app.use(express.static(__dirname))//挂载静态文件夹
app.use('/upLoads',express.static(__dirname + "/upLoads"))//挂载头像文件夹
app.use(express.json())//解析Json请求体、Post请求
app.use(express.urlencoded())//解析url编码
app.use(cookieParser('oh1Hao2Ni3Mao'))//解析请求头里面的cookie

//会话id
let sessionStore = Object.create(null)
app.use(function sessionMW(req,res,next) {
  if(req.cookies.sessionId){
    req.session = sessionStore[req.cookies.sessionId]
    if(!req.session){
      req.session = sessionStore[req.cookies.sessionId] = {}
    }
  }else{
    let id = Math.random().toString(16).slice(2)
    req.session = sessionStore[id] = {}
    res.cookie('sessionId',{
      maxAge:86400000,
    })
  }
  next()
})


app.use( async(req,res,next) => {//cookie检测
  let cookieInfo = req.signedCookies

  if(cookieInfo.user){//用户是否登录
    req.user = await db.get('SELECT * FROM user where name = ?',[cookieInfo.user]) //数据库中找出用户详情
  }
  next()
})


app.get('/', async (req,res,next) => {//渲染首页

  let posts = await db.all((`SELECT posts.rowid as id, * FROM posts JOIN users ON posts.userId=users.rowid`));

  console.log(req.user)
  console.log(posts)

  res.render('index.pug',{//渲染首页，并传入数据
    user:req.user,//传入用户登录的信息
    posts:posts//页面渲染数据
  })
})

app.get('/post/:id',async (req,res,next) => {//帖子路由
  let postId = req.params.id

  let post = await db.get(//查看帖子是否存在
    `SELECT 
      posts.rowid AS id,
      title,
      content,
      createdAt,
      userId,
      name,
      avatar
    FROM posts JOIN user ON userId = user.id
    where posts.rowid = ?`,
    [postId]
  )
  
  if(post){//查看帖子是否存在
    
    //这里查询帖子的所有回复
    let comments = await db.all(
      'SELECT * FROM comments JOIN users ON userId = users.rowid WHERE postId = ? ORDER BY createdAt DESC',
      [postId]
      )

    let data = {
      post:post,
      comments: comments,
      user:req.user
    }

    res.render('post.pug',data)                   
  } else {//未找到的帖子
    res.status(404)
    res.render('404.pug')
  }
})

app.route('/post')//发帖路由
  .get((req,res,next) => {//发帖页面
    res.render('add-post.pug',{
      user:req.user
    })
  })
  .post(async (req,res,next) => {//提交发帖
    if(!req.user){
      res.end('未登录,不能发帖')
      return
    }
    let post = req.body
    await db.run(
      'INSERT INTO posts VALUES(?,?,?,?)',
      [post.title,post.content,new Date().toISOString(),req.user.id]
    )

    let postEs = await db.get(
      'SELECT rowid as id ,* FROM posts ORDER BY rowid DESC LIMIT 1'
    )

    res.redirect('/post/' + postEs.id)//发帖后跳转到发帖地址
  })


app.post('/commit', async (req,res,next) => {//帖子回复路由
  console.log('收到评论请求',req.body)

  let comment = req.body

  if(req.user){//如果用户存在
    await db.run(
      `INSERT INTO COMMENTS VALUES (?,?,?,?)`,
      [comment.postId/*回复哪个帖子 */, req.user.id/*当前登陆用户id */, comment.content, new Date().toISOString()]
    )

    res.redirect('/post/' + comment.postId)//评论结束后跳回当前帖子

  }else{  
    res.end('未登录')
  }
})


app.route('/register')//用户注册路由
  .get((req,res,next) => {//页面请求
    res.render('register.pug')
  })
  .post(upLoader.single('avatar'), async (req,res,next) => {//注册请求
    let user = req.body
    let file = req.file
    let avatarOnlineUrl

    if(file){
      let  targetName = file.path + '-' + file.originalname
      await fsp.rename(file.path,targetName)
      avatarOnlineUrl = '/upLoads/' + path.basename(targetName)//头像地址
    }else{
      avatarOnlineUrl = '/upLoads/default-avatar.png'
    }
    
    try{
      await db.run(//数据库中插入新用户数据
        'INSERT INTO users VALUES(?,?,?,?)',
        [user.name,user.password,user.email,avatarOnlineUrl]
      )

      res.render('register-result.pug',{
        result:'注册成功',
        code : 0
      })
    }catch(e){
      res.render('register-result.pug',{
        result:'注册失败' + e.toString(),
        code : 1
      })
    }

  })


app.get('/username-conflict-check',async (req,res,next) => {//用户名冲突检测接口

  let user = await db.get('SELECT * FROM users WHERE name = ?',[req.query.name]) //用异步在数据中查找是否存在用户名

  if(user){//判断数据库中用户名是否存在
    res.json({
      code:1,
      mes:'用户名已被占用'
    })
  }else{
    res.json({
      code:0,
      mes:'用户名ok'
    })
  }

})

//验证码接口
app.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;
  
  res.type('svg');
  res.status(200).send(captcha.data);
});

app.route('/login')//登录路由
  .get((req,res,next) => {//页面请求
    res.render('login.pug',{
      previousUrl:req.get('referer')
    })
  })
  .post(async (req,res,next) => {//登录请求
    let loginInfo = req.body

    if(req.body.captcha !== req.session.captcha){//验证码
      res.json({
        code:1,
        mes:"登陆失败,验证码错误"
      })
      return
    }

    let user = await db.get(//检测数据库中账户密码
      'SELECT * FROM users where name = ? and password = ?',
      [loginInfo.name,loginInfo.password]
      )

    if(user){//用户是否存在
      res.cookie('user',user.name,{
        maxAge:86400000,//cookie的生命期
        signed:true//是否加密cookie
      })
      res.json({
        code:0,
        mes:'登陆成功',
        return_url:req.get("referer")
      })
    }else{
      res.json({
        code:1,
        mes:'登陆失败,用户名或密码错误'
      })
    }
  })

//密码更改映射用户
let changePasswordMap = {}
//忘记密码
app.route('/forgot')
  .get((req,res,next) => {
    res.render('forgot.pug')
  })
  .post(async(req,res,next) => {
    let email = req.body.email
    let user = await db.get("SELECT * FROM users WHERE email = ?",email)
    if(user){
      let changPasswordId = Math.random().toString(16).slice(2)

      changePasswordMap[changPasswordId] = user//密码映射用户

      //失效时间10分钟
      setTimeout( () => {
        delete changePasswordMap[changPasswordId]
      },1000 * 60 * 10)

      let changPasswordLink = 'http://localhost:8080/change-password/' +  changPasswordId

      let mail = {
        // 发件人 邮箱  '昵称<发件人邮箱>'
        from: `865876163@qq.com`,
        // 主题
        subject: '密码更改',
        // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
        to: user.email,
        //这里可以添加html标签
        html: `<b>您的密码更改地址为：${changPasswordLink} 请24小时内有效，请谨慎保管。</b>`
      }

      //发送邮件
      transporter.sendMail(mail, function(error, info) {
        if (error) {
            return console.log(error);
        }
        transporter.close()
        console.log('mail sent:', info.response)
    })

      console.log(changPasswordLink)
      console.log(changePasswordMap)
      res.end('A link has send to you email, open your Inbox and click the link to change password')
    }else{
      res.end("this email is not a register email in this site")
    }
  })

//更改密码
app.route("/change-password/:id")
  .get((req,res,next) => {
    let user = changePasswordMap[req.params.id]
    if(user){
      res.render("change-password.pug",{
        user
      })
    }else{
      res.end("link has expired")
    }
  })
  .post( async(req,res,next) => {
    let user = changePasswordMap[req.params.id]
    console.log(req.params.id)
    console.log(changePasswordMap)
    await db.run("UPDATE users SET password = ? where name = ?",req.body.password,user.name)

    delete changePasswordMap[req.params.id]//删除映射

    res.end("password change success!")
  })

app.get('/logout',(req,res,next) => {//登出请求
  res.clearCookie('user')
  res.redirect('/')
})

app.get("/user/:id",async (req,res,next) => {//用户页面
  let userInfo = await db.get("SELECT * FROM user WHERE id = ?",req.params.id)

  if(userInfo){
    let userPostPromise = db.all(`SELECT rowid as id, * FROM posts WHERE userId = ? ORDER BY createdAt DESC`,req.params.id)
    let userCommentsPromise = db.all(`SELECT postId,title as postTitle,comments.content,comments.createdAt FROM comments JOIN posts on postId = posts.rowid WHERE comments.userId = ? ORDER BY comments.createdAt DESC`,req.params.id)
    let [userPosts,userComments] = await Promise.all([userPostPromise,userCommentsPromise])

    res.render('user-profile.pug',{
      user:req.user,
      userInfo,
      userPosts,
      userComments,
    })
  }else{
    res.end("查无此人")
  }
})


app.listen(port,()=>{//监听端口
  console.log(`listening on http://localhost:${port}`)
})
