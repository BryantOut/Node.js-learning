//1、获取协议
var http = require('http');
//2、创建服务器
var server = http.createServer();
//3、开启HTTP服务器监听连接。
server.listen('3000',function () {
    console.log('http://127.0.0.1:3000');
});
//4、监听用户请求
/* 用户发送请求都会触发一个事件：request
    req：发送请求时传递过来的请求报文
    res：响应时的响应报文
*/
server.on('request',function(req,res) {
    // end函数可以将数据（字符串）返回到客户端
    // res.end('湖人总冠军');
    // 返回中文
    // 设置响应头：Content-Type
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8'
    });
    // 一个完整的响应必须有end
    res.end('返回中文');
});