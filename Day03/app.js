var http = require('http')
//引入自定义模块
var router = require('./router');
var server = http.createServer()
server.listen(3008,function () {
    console.log('http://127.0.0.1:3008')
})
server.on('request',function (req,res) {
    //当监听到请求时，交给路由器处理
    router.router(req,res)
})