/// <reference path="typings/qunit/qunit.d.ts" />
"use strict";
// u{XXXXXX} unicode code point
QUnit.test("u{XXXXXX} unicode code point", function (assert) {
    assert.equal('\uD87E\uDC04', "\uD87E\uDC04");
});
/* does not work on TypeScript
// Spread operator
QUnit.test("Spread operator", function (assert) {
  let array123 = [1, 2, 3];
    
  // For function call
  function f(x, y, z) { return [x, y, z]; }
  assert.notStrictEqual(array123, f(...array123));
  
  // For array literals
  assert.notStrictEqual([0, 1, 2, 3, 4, 5], [0, ...array123, 4, 5]);
});
*/
// for...of
QUnit.test("for...of", function (assert) {
    var out = "";
    for (var _i = 0, _a = [3, 5, 7]; _i < _a.length; _i++) {
        var i = _a[_i];
        out += i;
    }
    assert.equal(out, "357");
    /* does not work on TypeScript.
    out = "";
    let scripts = document.querySelectorAll("script");
    for (let i of scripts) {
      out += i.src;
    }
    assert.equal(Array.map(scripts, (v) => v.src).join(""), out);
    */
});
// Rest parameters
QUnit.test("Rest parameters", function (assert) {
    function funcK() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return args;
    }
    assert.notStrictEqual([1, 2, 3], funcK(1, 2, 3));
    function multiply(multiplier) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return args.map(function (v) { return (multiplier * v); });
    }
    assert.notStrictEqual([2, 4], multiply(2, 1, 2));
    assert.notStrictEqual([6], multiply(2, 3));
});
// Default parameters
QUnit.test("Default parameters", function (assert) {
    function multiply(a, b) {
        if (b === void 0) { b = 1; }
        return a * b;
    }
    assert.equal(2, multiply(2));
    function plural(num, singular, plural) {
        if (plural === void 0) { plural = singular + "s"; }
        return [num, (num > 1) ? plural : singular].join(" ");
    }
    assert.equal("2 dogs", plural(2, "dog"));
});
// Arrow functions
QUnit.test("Arrow functions", function (assert) {
    var empty = function () { };
    assert.equal(undefined, empty());
    var array = [
        "Hydrogen",
        "Helium",
        "Lithium",
        "Beryllium"
    ];
    assert.notStrictEqual(array.map(function (v) { return v.length; }), array.map(function (v) { return v.length; }));
    function Person() {
        var _this = this;
        this.age = 0;
        window.setTimeout(function () { _this.age++; }, 0);
    }
    var done1 = assert.async();
    var person = new Person();
    window.setTimeout(function () {
        assert.equal(1, person.age);
        done1();
    }, 100);
});
/* does not work on TypeScript
// function*
QUnit.test("function*", function (assert) {
  function* generatorCountUp(start) {
    for (let i = 0; true; i++) {
      yield start + i;
    }
  }
  let genCountUp = generatorCountUp(1);
  assert.notStrictEqual({value: 1, done: false}, genCountUp.next());
  assert.notStrictEqual({value: 2, done: false}, genCountUp.next());
  assert.notStrictEqual({value: 3, done: true}, genCountUp.next());
    
  function* generatorFromArray(array) {
    yield* array;
  }
  let genFromArray = generatorFromArray([1, 2, 3]);
  assert.notStrictEqual({value: 1, done: false}, genFromArray.next());
  assert.notStrictEqual({value: 2, done: false}, genFromArray.next());
  assert.notStrictEqual({value: 3, done: true}, genFromArray.next());
    
  function* generatorFun1(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
  }
  function* generatorFun2(i) {
    yield i;
    yield* generatorFun1(i);
    yield i + 10;
  }
  let genFun2 = generatorFun2(1);
  assert.notStrictEqual({value: 1, done: false}, genFun2.next());
  assert.notStrictEqual({value: 2, done: false}, genFun2.next());
  assert.notStrictEqual({value: 3, done: false}, genFun2.next());
  assert.notStrictEqual({value: 4, done: false}, genFun2.next());
  assert.notStrictEqual({value: 11, done: true}, genFun2.next());
});
*/
// Binary and octal numeric literals
QUnit.test("Binary and octal numeric literals", function (assert) {
    assert.equal(7, 7);
    assert.equal(2147483648, 2147483648);
    assert.equal(493, 493);
    assert.equal(420, 420);
});
// Template strings
QUnit.test("Template strings", function (assert) {
    assert.equal("Hi\n5!", "Hi\n" + (2 + 3) + "!");
    /* does not work on TypeScript
    assert.equal("Hi\\n5!", String.raw`Hi\n${2+3}!`);
    */
});
// Object initializer: shorthand property names
QUnit.test("Object initializer: shorthand property names", function (assert) {
    var a = "foo", b = 42, c = {};
    assert.notStrictEqual({ a: a, b: b, c: c }, { a: a, b: b, c: c });
});
/* does not work on TypeScript
// Object initializer: computed property names
QUnit.test("Object initializer: computed property names", function (assert) {
  let i = 0;
  let a = {
    ["foo" + ++i]: i,
    ["foo" + ++i]: i,
    ["foo" + ++i]: i
  };
  assert.equal(1, a.foo1);
  assert.equal(2, a.foo2);
  assert.equal(3, a.foo3);
});
*/
// Object initializer: shorthand method names
QUnit.test("Object initializer: shorthand method names", function (assert) {
    var o = {
        method: function (x, y) { return [x, y]; }
    };
    assert.notStrictEqual([1, 2], o.method(1, 2));
    /* does not work on TypeScript (target=es3)
    o.property = 2;
    assert.equal(2, o.property);
    o.property = 1;
    assert.equal(1, o.property);
    */
    /* does not work on TypeScript
    let gen = o.generator(1);
    assert.equal(1, gen.next().value);
    assert.equal(2, gen.next().value);
    */
});
// Destructuring assignment
QUnit.test("Destructuring assignment", function (assert) {
    var _a = [1, 2], a0 = _a[0], a1 = _a[1];
    assert.equal(1, a0);
    assert.equal(2, a1);
    var _b = [1, 2, 3, 4, 5], b0 = _b[0], b1 = _b[1], bRest = _b.slice(2);
    assert.equal(1, b0);
    assert.equal(2, b1);
    assert.notStrictEqual([3, 4, 5], bRest);
    // Swapping variables
    var c0 = 1, c1 = 3;
    _c = [c1, c0], c0 = _c[0], c1 = _c[1];
    assert.equal(3, c0);
    assert.equal(1, c1);
    // Multiple-value returns
    function funcK() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return args;
    }
    var _d = funcK(1, 2), d0 = _d[0], d1 = _d[1];
    assert.equal(1, d0);
    assert.equal(2, d1);
    // Ignoring some returned values
    var _e = funcK(1, 2, 3), e0 = _e[0], e2 = _e[2];
    assert.equal(1, e0);
    assert.equal(3, e2);
    // Object destructuring
    var _f = { f0: 1, f1: 2 }, f0 = _f.f0, f1 = _f.f1;
    assert.equal(1, f0);
    assert.equal(2, f1);
    var _g = { foo: 1, bar: 2 }, g0 = _g.foo, g1 = _g.bar;
    assert.equal(1, g0);
    assert.equal(2, g1);
    var _c;
    /* **does not works on babel now**
    // Function argument defaults
    function func({arg0 = 1, arg1 = {x: 0, y: 0}} = {}) {
      return [arg0, arg1];
    }
    assert.notStrictEqual([1, {x:0, y:0}], func());
    assert.notStrictEqual([2, {x:0, y:0}], func({arg0: 2}));
    assert.notStrictEqual([1, {x:1, y:1}], func({arg1: {x: 1, y: 1}}));
    */
});
// const
QUnit.test("const", function (assert) {
    var x = 1;
    assert.equal(1, x);
});
// let
QUnit.test("let", function (assert) {
    var x = 0;
    if (true) {
        var x_1 = 2;
        assert.equal(2, x_1);
    }
    assert.equal(0, x);
    /* does not work on TypeScript
    let list = [];
    let clickedItem = undefined;
    for (let i of [1, 2, 3]) {
      let item = document.createElement("li");
      item.innerHTML = ""+i;//i;
      let _i = i;
      item.addEventListener("click", function (v) {
        clickedItem = _i;
      });
      list.push(item);
    }
    let event = document.createEvent("MouseEvents");
    event.initEvent("click", false, true);
    list[0].dispatchEvent(event);
    assert.equal(1, clickedItem);
    list[1].dispatchEvent(event);
    assert.equal(2, clickedItem);
    list[2].dispatchEvent(event);
    assert.equal(3, clickedItem);
    */
});
