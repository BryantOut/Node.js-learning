var express = require('express')
// 创建路由模块对象
var router = express.Router()

//引入数据处理模块
var handler = require('./handler')

router.get('/', handler.getIndexPage)
    .get('/add', handler.getAddPage)
    .get('/fileUpload', handler.doFileUpload)
    .post('/add', handler.addHero)
    .get('/edit', handler.getEditPage)
    .post('/edit', handler.doEdit)
    .get('/del', handler.doDel)


// 暴露成员
module.exports = router