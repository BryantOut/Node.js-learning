// 1、获取协议
var http = require('http');
// 2、创建一个服务器
var server = http.Server();
// 3、添加对请求端口的监听(设置所有监听的端口)
server.listen('3000',function() {
    console.log('http://127.0.0.1:3000');
});
//4、监听用户的请求
server.on('request',function(req,res) {
    //接收用户请求路径：是基于服务器根目录的路径
    var url = req.url;
    console.log(url);
    // 返回中文
    // 设置响应头：Content-Type
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8'
    });
    //实现业务处理
    if (url == '/index' || url == '/') {
        res.end('首页');
    } else if (url === '/category') {
        res.end('分类页面')
    } else if (url === '/cart') {
        res.end('购物车页面')
    } else {
        res.end('404')
    }
});