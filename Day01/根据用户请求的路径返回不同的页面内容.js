// 1、获取协议
var http = require('http');
// 2、初始化fs文件系统
var fs = require('fs');
// 3、构建服务器
var server = http.createServer();
// 4、设置对某一个端口的监听
server.listen('3000',function() {
    console.log('http://127.0.0.1:3000');
});
// 5、监听用户的请求
server.on('request',function(req,res) {
    //接收用户请求的路径：是基于服务器根目录的路径
    var url = req.url;

    //实现业务逻辑
    if (url === '/index' || url === '/') {
        fs.readFile('./page/index.html',function(err,data) {
            if (err) res.end('err');
            else {
                res.end(data.toString());
            }
        });
    } else if (url === '/category') {
        fs.readFile('./page/category.html',function(err,data) {
            if (err) res.end('err');
            else {
                res.end(data.toString());
            }
        });
    } else if (url === '/cart') {
        fs.readFile('./page/cart.html',function(err,data) {
            if (err) res.end('err');
            else {
                res.end(data.toString());
            }
        });
    } else {
        res.end('404')
    }
});