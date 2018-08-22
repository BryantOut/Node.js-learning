// var http = require('http')
// //引入自定义模块
// var router = require('./router');
// var server = http.createServer()
// server.listen(3008,function () {
//     console.log('http://127.0.0.1:3008')
// })
// server.on('request',function (req,res) {
//     //当监听到请求时，交给路由器处理
//     router.router(req,res)
// })


var express = require('express')
var router = require('./router');
var app = express()// app就是一个服务器

// 静态文件托管
app.use(express.static('public'))

// 设置服务器监听端口
app.listen(3008, () => {
    console.log('http://127.0.0.1:3008')
})

// 让当前应用使用我们定制的路由规则
// 挂载--use
// 注入路由
app.use(router)