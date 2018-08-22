var fs = require('fs')
var template = require('art-template')
var getDataModule = require('./getDataModule')
var path = require('path')
var formidable = require('formidable'); //载入 formidable
var queryString = require('querystring')
var myUrl = require('url') //引入node.js中的url模块,用于URL解析、处理等操作的解决方案
// 1.获取首页动态数据  req.url === '/' || req.url === '/index' mehtod === 'get'

exports.getIndexPage = (req, res) => {
    var url = req.url
    fs.readFile(__dirname + '/page/index.html', (err, data) => {
        if (err) res.end('404')
        else {
            getDataModule.getDataModule((err, data) => {
                if (err) {
                    res.end('err')
                } else {
                    /* 基于模板名渲染模板 template(filename, data); */
                    var html = template(__dirname + "/page/index.html", {
                        heros: data.heros
                    })
                    res.end(html)
                }
            });
        }
    })
}
// 7.实现静态资源的加载 req.url === '/css/ | /images/'
exports.getStaticSource = (req, res) => {
    var url = req.url
    fs.readFile(__dirname + req.url, (err, data) => {
        if (err) res.end('404')
        else {
            res.end(data)
        }
    })
}

// 3.实现新增操作 req.url === '/add' method === 'post'
exports.getAddPage = (req, res) => {
    var url = req.url
    var method = req.method
    fs.readFile(__dirname + '/page/add.html', (err, data) => {
        if (err) res.end('err')
        else {
            res.end(data)
        }
    })
}

// 8.实现文件的上传操作 req.url === 'fileUpload' method === 'post'
exports.doFileUpload = (req, res) => {
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = __dirname + '/images' //文件上传 临时文件存放路径 
    form.keepExtensions = true
    //该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
    form.parse(req, function (err, fields, files) {
        if (err) {
            var ret = {
                code: 100,
                msg: '上传失败'
            }
            res.end(JSON.stringify(ret))
        } else {
            // console.log(files.file.path)
            //C:\\gitFile\\Node.js\\Day03\\images\\upload_b03bbbda8171ce9a8541fd9240f8d81c.jpg
            var filename = path.basename(files.file.path)
            // console.log(filename)
            //upload_9d84463c00ffd935698c958822a60eb2.jpg
            var ret = {
                code: 400,
                imgName: filename,
                msg: '上传成功'
            }
            res.end(JSON.stringify(ret))
        }
    });
}

// 4.实现新增功能
exports.addHero = (req, res) => {
    // console.log(req)
    // 1.接收参数：参数都是字符串
    // 2.在node中允许传递大容量的参数，如果传递的参数较大，那么它支持分批接收参数
    // 3.在接收参数的时候，会持续的触发data事件
    // 4.data事件中有一个回调函数，这个函数的参数就是每次接收到的字符串
    var str = ''
    req.on('data', (chunk) => {
        str += chunk
    })
    // 如果参数接收完毕，会自动触发end事件
    req.on('end', () => {
        //console.log(str)
        //name=sss&gender=%E7%94%B7&img=upload_8766451b2b7779ff7df6f48be075be89.jpg
        //而我们需要的是一个对象
        /*querystring.parse(str,separator,eq,options)
        parse这个方法是将一个字符串反序列化为一个对象。*/
        var newObj = queryString.parse(str)
        // console.log(newObj)
        /* {
            name: '222',
            gender: '女',
            img: 'upload_03a0863ea19392bcaa7c1b03e0427908.jpg'
        } */
        getDataModule.addHero(newObj, (err) => {
            if (err) {
                var ret = {
                    code: 100,
                    msg: '添加英雄失败'
                }
                res.end(JSON.stringify(ret))
            } else {
                var ret = {
                    code: 200,
                    msg: '添加英雄成功'
                }
                res.end(JSON.stringify(ret))
            }
        })
    })
}

// 5.获取编辑页面的数据
exports.getEditPage = (req, res) => {
    var url = req.url
    var editId = myUrl.parse(__dirname + url, true).query.id

    // getDataModule.getDataModule((err,data)=>{
    //     if (err) res.end('err')
    //     else {

    //         var html = template(__dirname+'/page/edit.html',{list:data})
    //         res.end(html)
    //     } 
    // })

    getDataModule.getHeroInfoById(editId, (err, data) => {
        if (err) res.end('err')
        else {
            var html = template(__dirname + '/page/edit.html', data)
            res.end(html)
        }
    })
}

// 实现编辑页面编辑功能
exports.doEdit = (req, res) => {
    // 1.formidable模块介绍=>用于处理post方式提交的表单
    //创建Formidable.IncomingForm对象
    var form = new formidable.IncomingForm()
    //设置表单域的编码
    form.encoding = 'utf-8'
    /* form.parse->该方法会转换请求中所包含的表单数据，
    callback会包含所有字段域和文件信息 */
    form.parse(req, function (err, fields, files) {
        getDataModule.uploadHeroInfo(fields, (err) => {
            if (err) {
                var ret = {
                    code: 100,
                    msg: '修改英雄失败'
                }
                res.end(JSON.stringify(ret))
            } else {
                var ret = {
                    code: 200,
                    msg: '修改英雄成功'
                }
                res.end(JSON.stringify(ret))
            }
        })
    })
}

// 实现删除功能
exports.doDel = (req, res) => {
    var delId = myUrl.parse(req.url, true).query.id
    getDataModule.delHero(delId, (err) => {
        if (err) {
             var retValue = {
                code:100,
                msg:'删除失败'
            }
            res.end(JSON.stringify(retValue))
        } else {
            var retValue = {
                code:200,
                msg:'删除成功'
            }
            res.end(JSON.stringify(retValue))
        }
    })
}