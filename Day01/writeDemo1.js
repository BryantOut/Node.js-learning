// 1、引入fs
var fs = require('fs')
// 2、调用写入方法
fs.writeFile("./text2.txt",'我们要追加什么呢',function (err) {
    if (err) {
        console.log('写入失败')
    } else {
        console.log('ok')
    }
});