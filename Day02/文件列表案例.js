// var template = require('art-template')

// 获取协议
// var http = require('http')
// 创建服务器
// var server = http.createServer();
// 开启HTTP服务器监听连接
// server.listen('3000', function () {
//     console.log('http:127.0.0.1:3000')
// })
// 监听用户请求
// server.on('request', function (req, res) {

// })

var fs = require('fs')
//__dirname当前模块的文件夹名称
//readdir读取一个目录的内容。
fs.readdir(__dirname,(err,data) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(data)/* 返回一个数组 */
        /* 1.data就是当前目录下所有文件和文件夹的名称数组，但是并不满足需要
           2.我们可以将目录和文件名称拼接生成一个文件或文件夹的全路径，根据这个全路径
           获取到具体的文件或文件夹对象，再获取它们的属性
        */  
    }
})