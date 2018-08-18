var fs = require('fs')
fs.appendFile('text.txt','\n科比布莱恩特是湖人名宿',function (err) {
    if (err) {
        console.log("追加失败");
    } else {
        console.log("ok");
    }
})