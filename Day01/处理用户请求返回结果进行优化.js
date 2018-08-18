// 1、获取协议
var http = require('http');
// 2、引入fs核心模块
var fs = require('fs');
// 3、创建服务器
var server = http.createServer();
// 4、添加对请求端口的监听
server.listen('3000', function () {
    console.log('http://127.0.0.1:3000');
});
// 5、监听用户的请求
server.on('request', function (req, res) {
    //接收用户请求路径：是基于服务器根目录的路径
    var url = req.url;
    // console.log(__dirname);
    //业务实现
    /* __dirname:
    相当于当前服务器的根目录：
    当前你以哪个文件作为运行服务器的目录--这个目录就是根目录
    */
    fs.readFile(__dirname + url, function (err, data) {
        if (err) res.end('err')
        else {
            res.end(data);
        }
    });
});