// 1、获取协议
var http = require('http');
// 2、引入fs核心模块
var fs = require('fs');
// 3、创建服务器
var server = http.createServer();
// 4、设置该服务器对某一个端口进行监听
server.listen('3000',function() {
    console.log('http://127.0.0.1:3000');
});
// 5、监听用户的请求
server.on('request',function(req,res) {
    // 接收用户请求的路径：是基于服务器根目录的路径
    var url = req.url;
    // 实现业务处理
    if (url === '/index' || url === '/') {
        fs.readFile('./page/index.html',function(err,data) {
            if (err) res.end('err');
            else {
                res.end(data.toString());
            }
        });
    } else if (url === '/css/index.css') {
        fs.readFile('./css/index.css',function(err,data) {
            if (err) {
                res.end('err');
            } else {
                res.end(data.toString());
            }
        });
    }   
});