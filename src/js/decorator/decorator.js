//一、类的装饰
//@testable是一个装饰器，它修改了MyTestableClass这个类的行为，
//为它加上了静态属性isTestable
@testable
class MyTestableClass {

}

function testable(target) {
    target.isTestable = true; //taget是MyTestableClass本身
}

//console.log(MyTestableClass.isTestable); true

//==============================================
//接收参数，修改装饰器的行为
//为类添加一个静态属性
function testable1(isTestable) {
    return function(target) {
        target.isTestable = isTestable;
    }
}

@testable1(true)
class MyTestableClass1 {}
//console.log(MyTestableClass1.isTestable) true

@testable1(false)
class MyClass {}
//console.log(MyClass.isTestable); false

//==============================================
//添加实例属性，可以通过目标类的prototype对象操作
function testable2(target) {
    target.prototype.isTestable = true;
}

@testable2
class MyTestableClass2{}

let obj = new MyTestableClass2();
//console.log(obj.isTestable); true

//==============================================
//通过装饰器mixins,把Foo对象的方法添加到了MyClass1的实例上面。可以通过
//Object.assign()模拟这个功能
function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list);
    }
}

const Foo = {
    foo() {
        //console.log('foo');
    }
}

@mixins(Foo)
class MyClass1 {}

let obj1 = new MyClass1();

//obj1.foo();
//==============================================

//二、方法的装饰
//装饰器不仅可以装饰类，还可以装饰类的属性
class Person {
    @readonly
    name() {
        return `${this.first} ${this.last}`
    }
}

function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}

//readonly(Person.prototype, 'name', this);

const obj3 = new Person();
//console.log(obj.proto === Person/prototype)

//==============================================
//Mixin
//“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。
const Foo1 = {
    foo() { console.log('foo') }
};

class MyClass3{}

Object.assign(MyClass3.prototype, Foo1);

let obj4 = new MyClass3();
//obj4.foo();

//将Mixin写成一个装饰器
//就可以使用上面这个装饰器，为类“混入”各种方法
import { mixinsIn } from './mixins';

const Foo2 = {
    foo() { console.log('mixin-foo') }
}

@mixinsIn(Foo2)
class MyClass4 {}

let obj5 = new MyClass4();
obj5.foo();

//上面的写法会改写Myclass4类的prototype对象，如果不喜欢这一点，可以
//通过类的继承实现Mixin
// class MYClass extends MYBaseClass {
//     /* */
// }

/*
MYClass继承了MYBaseClass。如果想在MYClass里面“混入”一个
foo方法，一个办法是在MYClass和MYBaseClass之间混入一个类，
这个类具有foo方法，并继承了MYBaseClass的所有方法，然后
MYClass再继承这个类
*/
class MYBaseClass{
    
}

let MyMixin = (superclass) => class extends superclass {
    foo() {
        console.log('foo from MyMixin');
    }
}

/*
上面代码中，MyMixin是一个混入类生成器，接受superclass作为参数，
然后返回一个继承superclass的子类，该子类包含一个foo方法。
接着，目标类再去继承这个混入类，就达到了“混入”foo方法的目的。
*/

class MYClass1 extends MyMixin(MYBaseClass) {
    /*  */
}

let c = new MYClass1();
//c.foo();

//如果需要“混入”多个方法，就生成多个混入类。
// class MyClass extends Mixin1(Mixin2(MYBaseClass)) {
//     /* .... */ 
// }

let Mixin1 = (superclass) => class extends superclass {
    foo() {
        console.log('foo from Mixin1');
        if(super.foo) {
            super.foo();
        }
    }
}

let Mixin2 = (superclass) => class extends superclass {
    foo() {
        console.log('foo from Mixin2');
        if(super.foo) {
            super.foo();
        }
    }
}

class S {
    foo() {
        console.log('foo from s');
    }
}

class C extends Mixin1(Mixin2(S)) {
    foo() {
        console.log('foo from C');
        super.foo();
    }
} 

new C().foo();
/*
上面代码中，每一次混入发生时，都调用了父类的super.foo方法，
导致父类的同名方法没有被覆盖，行为被保留了下来。
*/
