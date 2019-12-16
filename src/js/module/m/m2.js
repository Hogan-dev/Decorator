import { foo } from './m1.js';

console.log(foo); //bar
setTimeout(() => console.log(foo), 500); //baz

/*
上面代码表明，ES6 模块不会缓存运行结果，
而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。
*/