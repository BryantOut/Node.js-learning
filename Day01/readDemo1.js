// console.log("hello world");
// 引入核心模块
// require:关键字
// 'fs':是核心模块的名称--写死不能改
//操作文本模块
var fs = require('fs');
fs.readFile("text.txt",function(err,data){
    if (err) {
        console.log('写入失败');
    } else {
        console.log(data.toString());
    }
});