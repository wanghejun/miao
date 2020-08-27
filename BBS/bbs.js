const express = require('express')//导入express模块
const app = express()//实列出一个express
const cookieParser = require('cookie-parser')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
let port = 8080 //端口号

let db //数据库
sqlite.open({//连接数据库
  filename:__dirname + '/bbs.db',//数据库路径
  driver:sqlite3.Database//
}).then(value => {
  db = value
})

let nextUserId = 3//下一个用户ID
let users =[//用户列表
  {
    id:1,
    name: 'violet evergarden',
    password:'123456',
    email:'violet@qq.com',
    avatar: '/upload/avatars/123.png' 
  },
  {
    id:2,
    name: '聂文俊',
    password:'123456',
    email:'nie@qq.com',
    avatar: '/upload/avatars/1234.png' 
  },
]
let nextPostId = 9//全部帖子的数里
let posts =[//帖子列表
  {
    id:1,
    title: '小米10至尊版',
    content: '都给我买小米儿',
    createdAt: Date.now(),
    ownerId:1,
    commentCount:2
  },
  {
    id:2,
    title: '懂王',
    content: '没有人比我更懂小米儿',
    createdAt: Date.now(),
    ownerId:2,
    commentCount:0
  },
  {
    id:1,
    title: '小米10至尊版',
    content: '都给我买小米儿',
    createdAt: Date.now(),
    ownerId:1,
    commentCount:2
  },
  {
    id:2,
    title: '懂王',
    content: '没有人比我更懂小米儿',
    createdAt: Date.now(),
    ownerId:2,
    commentCount:0
  },
  {
    id:1,
    title: '小米10至尊版',
    content: '都给我买小米儿',
    createdAt: Date.now(),
    ownerId:1,
    commentCount:2
  },
  {
    id:2,
    title: '懂王',
    content: '没有人比我更懂小米儿',
    createdAt: Date.now(),
    ownerId:2,
    commentCount:0
  },
  {
    id:1,
    title: '小米10至尊版',
    content: '都给我买小米儿',
    createdAt: Date.now(),
    ownerId:1,
    commentCount:2
  },
  {
    id:2,
    title: '懂王',
    content: '没有人比我更懂小米儿',
    createdAt: Date.now(),
    ownerId:2,
    commentCount:0
  },
]
let nextCommentId = 3
let comments =[//回复列表
  {
    id:1,
    replyTo:1,
    ownerId:2,
    content:'test running man',
    createdAt:Date.now(),
  },
  {
    id:2,
    replyTo:1,
    ownerId:1,
    content:'test running mans',
    createdAt:Date.now(),
  }
]


app.disable('x-powered-by')//禁用这个响应头，原因 => 它显示自己服务器构建的名字
app.locals.pretty = true //返回的页面源码不压缩
app.set('views',__dirname + '/views')//模板存放地址


app.use((req,res,next) => {//打印出请求方法和URL
  console.log(req.method,req.url)
  next()
})


app.use(express.static(__dirname))//挂载静态文件夹
app.use(express.json())//解析Json请求体、Post请求
app.use(express.urlencoded())//解析url编码
app.use(cookieParser('oh1Hao2Ni3Mao'))//解析请求头里面的cookie


app.use( async(req,res,next) => {//cookie检测
  let cookieInfo = req.signedCookies

  if(cookieInfo.user){//用户是否登录
    req.user = await db.get('SELECT * FROM user where name = ?',[cookieInfo.user]) //数据库中找出用户详情
  }
  next()
})


app.get('/', (req,res,next) => {//渲染首页

  let postInfo = posts.map(post => {//获取数据
    return {
      ...post,//对象展开语法
      user:users.find(user => post.ownerId == user.id)
    }
  })

  res.render('index.pug',{//渲染首页，并传入数据
    user:req.user,//传入用户登录的信息
    posts:postInfo//页面渲染数据
  })
})


app.get('/post/:id',async (req,res,next) => {//帖子路由
  let postId = req.params.id

  let post = await db.get(
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
    let comments = await db.all('SELECT * FROM comments WHERE postId = ? ORDER BY createdAt DESC',[postId])

    let data = {
      post:post,
      comments: comments
    }

    res.render('post.pug',data)                   
  } else {//未找到的帖子
    res.status(404)
    res.render('404.pug')
  }
})


app.route('/post')//发帖路由
  .get((req,res,next) => {//发帖页面
    res.render('add-post.pug')
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
      'SELECT rowid as id ,* FROM posts ORDER BY rowid DESE LIMIT 1'
    )
    // post.createdAt = Date.now()
    // post.ownerId = req.user.id
    // post.id = nextPostId++
    // post.commentCount = 0

    // posts.push(post)

    res.redirect('/post/' + postEs.id)//发帖后跳转到发帖地址
  })


app.post('/commit',(req,res,next) => {//帖子回复路由
  console.log('收到评论请求',req.body)
  if(req.user){
    let comment = req.body
    comment.createdAt = Date.now()
    comment.ownerId = req.user.id
    comment.id = nextCommentId++

    comments.push(comment)

    res.redirect('/post/' + comment.replyTo)

  }else{  
    res.end('未登录')
  }
})


app.route('/register')//用户注册路由
  .get((req,res,next) => {//页面请求
    res.render('register.pug')
  })
  .post(async (req,res,next) => {//注册请求
    console.log('收到注册请求',req.body)
    let user = req.body

    try{
      await db.run(//数据库中插入新用户数据
        'INSERT INTO users VALUES(?,?,?,?)',
        [user.name,user.password,user.email,'avatar.png']
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


app.route('/login')//登录路由
  .get((req,res,next) => {//页面请求
    res.render('login.pug')
  })
  .post(async (req,res,next) => {//登录请求
    let loginInfo = req.body

    let user = await db.get(//检测数据库中账户密码
      'SELECT * FROM users where name = ? and password = ?',
      [loginInfo.name,loginInfo.password]
      )

    if(user){
      res.cookie('user',user.name,{
        maxAge:86400000,//cookie的生命期
        signed:true//是否加密cookie
      })
      res.json({
        code:0,
        mes:'登陆成功'
      })
    }else{
      res.json({
        code:1,
        mes:'登陆失败,用户名或密码错误'
      })
    }
  })


app.get('/logout',(req,res,next) => {//登出请求
  res.clearCookie('user')
  res.redirect('/')
})


app.listen(port,()=>{//监听端口
  console.log(`listening on http://localhost:${port}`)
})
