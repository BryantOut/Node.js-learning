//引入数据处理模块
var handler = require('./handler')
// 路由处理函数
exports.router = (req, res) => {
    // 1.获取当前用户请求的url -- 路由
    var url = req.url
    // 获取请求方式  GET/POST
    var method = req.method
    // 1.获取首页动态数据  req.url === '/' || req.url === '/index' mehtod === 'get'
    if (url === '/' || url === '/index' && method === 'GET') {
        //交给数据处理模块处理
        handler.getIndexPage(req, res)
    }

    // 7.实现静态资源的加载 req.url === '/css/ | /images/'
    if (url.indexOf('/images') === 0 && method === 'GET' || url.indexOf('/node_modules') === 0 && method === 'GET') {
        handler.getStaticSource(req, res)
    }

    // 3.实现新增操作 req.url === '/add' method === 'get'
    if (url === '/add' && method === 'GET') {
        handler.getAddPage(req, res)
    }

    // 4.实现临时存储图片的功能
    if (url === '/fileUpload' && method === 'POST') {
        handler.doFileUpload(req, res)
    }

    // 5.处理添加英雄功能
    if (url === '/add' && method === 'POST') {
        handler.addHero(req, res)
    }

    // 6.实现编辑页面渲染
    if (url.indexOf('/edit') === 0 && method === 'GET') {
        handler.getEditPage(req, res)
    }

    // 7.实现编辑页面实现编辑功能
    if (url.indexOf('/edit') === 0 && method === 'POST') {
        handler.doEdit(req, res)
    }

    // 8.实现删除功能
    if (url.indexOf('/del') === 0 && method === 'GET') {
        handler.doDel(req, res)
    }
}