var obj = {
    name:"史蒂芬库里",
    num:"30",
    sayHi:function(){
        return ()=>{
            console.log("Nothing is impossible");
        }
    }
}
exports.sayHi = obj.sayHi();


// 每一个模块都有一个单独的exports，它是一个对象,当这个模块被引入的时候，这个对象会自动的返回
// exports

// exports.obj = obj;


// exports = obj
// 建议：不要轻易的使用对象重置的方式暴露成员。一般建议使用点语法，使用点语法，exports和 module.exports的使用方式和效果没有区别