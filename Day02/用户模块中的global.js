obj = {
    name: "科比布莱恩特",
    number: 24,
    sayHi: sayHi
}

function sayHi() {
    console.log(obj.name + ":" + obj.number);
}

global.sayHi = sayHi;

// 暴露成员给外界使用
// 1.不建议的方式：使用全局的global:它的作用类似于window
// 2.不建议的原因：
// 1.不同的引入模块中有重名成员的时候，后引入的模块成员会将前面引入的模块成员覆盖
// 2. 成员不明确
// 3.在global上面太多成员不方便管理