var fs = require('fs')
exports.getDataModule = (callback) => {
    fs.readFile(__dirname + '/data/data.json', (err, data) => {
        if (err) callback(err)
        else {
            //让用户直接使用到它想用的数据类型
            callback(null, JSON.parse(data.toString()))
        }
    })
}

// 添加新英雄数据到json文件中
exports.addHero = (newObj, callback) => {
    fs.readFile(__dirname + '/data/data.json', (err, data) => {
        if (err) callback(err)
        else {
            // 1.读取json文件转换为对象或数组
            var dataObj = JSON.parse(data)
            // 2.获取最后一个元素的id号 + 1
            newObj.id = dataObj.heros[dataObj.heros.length - 1].id + 1
            // 3.将新数据添加到数组中
            dataObj.heros.push(newObj)
            // 4.再将添加了新数据的数组重新写入到文件
            fs.writeFile(__dirname + '/data/data.json', JSON.stringify(dataObj), (err, data) => {
                if (err) callback(err)
                else callback(null)
            })
        }
    })
}

// 根据英雄的id获取响应的信息
exports.getHeroInfoById = (id, callback) => {
    this.getDataModule((err, data) => {
        if (err) callback(err)
        else {
            data.heros.forEach((value, index) => {
                if (value.id == id) {
                    callback(null, value)
                }
            })
        }
    })
}

// 更新用户信息
exports.uploadHeroInfo = (editObj, callback) => {
    this.getDataModule((err, data) => {
        if (err) callback(err)
        else {
            data.heros.forEach((value, index) => {
                if (value.id == editObj.id) {
                    value.name = editObj.name
                    value.gender = editObj.gender
                    value.img = editObj.img
                    // 将数据重新写入文件
                    fs.writeFile(__dirname + '/data/data.json', JSON.stringify(data), (err) => {
                        if (err) {
                            callback(err)
                        } else {
                            callback(null)
                        }
                    })
                }
            })
        }
    })
}

// 删除用户
exports.delHero = (id, callback) => {
    this.getDataModule((err, data) => {
        if (err) callback(err)
        else {
            for (var i = 0; i < data.heros.length; i++) {
                if (data.heros[i].id == id) {
                    data.heros.splice(i, 1)
                    break
                }
            }
            // 将数据重新写入到文件
            console.log(data)
            fs.writeFile(__dirname + '/data/data.json', JSON.stringify(data,null," "), (err) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null) 
                }
            })
        }
    })
}