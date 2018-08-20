/* 
将模板源代码编译成函数并立刻执行 
template.render(source, data, options); 
*/
var template = require('art-template')
var fs = require('fs')
fs.readFile(__dirname+"/page/index.html",'utf-8',function (err,data) {
    if (err) console,log('err')
    else {
        var html = template(data,{name:"史蒂芬库里",number:30})
        console.log(html)
    } 
})
