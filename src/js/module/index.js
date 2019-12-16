var mod = require('./lib');


console.log(mod.counter); //3
mod.incCounter();
console.log(mod.counter); //3

//lib模块被加载以后，它的内部变化影响不到输出的mod.counter
//这是因为mod.counter是一个原始类型的值，会被缓存。除非写成一个函数
//才能得到内部变动后的值


/*
ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，
遇到模块加载命令import，就会生成一个只读引用。
等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，
import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，
模块里面的变量绑定其所在的模块。
*/
