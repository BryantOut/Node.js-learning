var template = require('art-template')
var fs = require('fs')
// 获取协议
var http = require('http')
// 创建服务器
var server = http.createServer();
// 开启HTTP服务器监听连接
server.listen('3000', function () {
    console.log('http://127.0.0.1:3000')
})
// 监听用户请求
server.on('request', (req, res) => {
    //__dirname当前模块的文件夹名称
    //readdir读取一个目录的内容。
    var count = 0
    fs.readdir(__dirname, (err, data) => {
        if (err) {
            res.end('err')
        } else {
            // 创建一个数组存储所有文件和文件夹对象
            var dirInfoList = [];
            var dirList = [];
            var fileList = [];
            //遍历数组，获取每一个数组元素所代表的文件或文件夹的详细信息
            data.forEach((value, index, array) => {
                //fs.stat()：可以根据全路径获取文件或文件夹的详细信息
                fs.stat(__dirname + '/' + value, (err2, stat) => {
                    if (err2) res.end('err2')
                    else {
                        count++
                        console.log(stat)
                        //每一个stat应该生成页面中的一行数据，一行数据就是一个对象
                        var obj = {}
                        obj.name = value
                        obj.size = stat.size
                        obj.mtime = stat.mtime
                        // isFile函数判断是文件还是文件夹，如果是文件则返回true
                        obj.type = stat.isFile()
                        //将对象存储到数组中
                        //dirInfoList.push(obj)

                        //判断是文件还是文件夹，分别存入不同的数组
                        if (stat.isFile()) {
                            fileList.push(obj)
                        } else {
                            dirList.push(obj)
                        }

                        // 因为读取文件是异步请求，
                        //所以并不知道什么时候会完成，所以应该在循环内部判断并渲染
                        //判断是否读取完毕
                        if (count == data.length) {
                            //先将文件数组及文件夹数组排序后再进行连接
                            dirList.sort(sortByFileName)
                            fileList.sort(sortByFileName)
                            //将文件数组及文件夹数组连接起来
                            dirInfoList = dirList.concat(fileList)//注意concat返回的是一个副本，注意接收
                            var html = template(__dirname + "/index.html", {
                                list: dirInfoList
                            })
                            res.end(html)
                        }
                    }
                })
            })
        }
    })
})

function sortByFileName(a, b) {
    if (a.name > b.name) {
        return 1
    } else {
        return -1
    }
}