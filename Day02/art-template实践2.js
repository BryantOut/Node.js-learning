/* 将模板源代码编译成函数 
template.compile(source, options); */
var template = require('art-template')
var fs = require('fs')

fs.readFile(__dirname + "/page/index.html",'utf-8',function (err, data) {
    if (err) console.log('err')
    else {
        var html = template.compile(data)
        console.log(html)
    }
})