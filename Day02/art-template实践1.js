/* 基于模板名渲染模板 
template(filename, data); */
var template = require("art-template")
var html = template(__dirname+"/page/index.html",{name:'科比布莱恩特',number:24})
console.log(html)
