/// <reference path="typings/qunit/qunit.d.ts" />

"use strict";

// u{XXXXXX} unicode code point
QUnit.test("u{XXXXXX} unicode code point", function (assert) {
  assert.equal('\uD87E\uDC04', '\u{2F804}');
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
  let out = "";
  for (let i of [3, 5, 7]) {
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
  function funcK(...args) {
    return args;
  }
  assert.notStrictEqual([1, 2, 3], funcK(1, 2, 3));
  
  function multiply(multiplier, ...args) {
    return args.map((v) => (multiplier * v));
  }
  assert.notStrictEqual([2, 4], multiply(2, 1, 2));
  assert.notStrictEqual([6], multiply(2, 3));
});


// Default parameters
QUnit.test("Default parameters", function (assert) {
  function multiply(a, b = 1) { return a*b; }
  assert.equal(2, multiply(2));
    
  function plural(num, singular, plural = singular + "s") {
    return [num, (num > 1)? plural : singular].join(" ");
  }
  assert.equal("2 dogs", plural(2, "dog"));
});

// Arrow functions
QUnit.test("Arrow functions", function (assert) {
  let empty = () => {};
  assert.equal(undefined, empty());
  
  let array = [
    "Hydrogen",
    "Helium",
    "Lithium",
    "Beryllium"
  ];
  assert.notStrictEqual(array.map(function(v) { return v.length; }), array.map( v => v.length ));

  function Person () {
    this.age = 0;
      
    window.setTimeout(() => { this.age++; }, 0);
  }
  let done1 = assert.async();
  let person = new Person();
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
  assert.equal(7, 0b111);
  assert.equal(2147483648, 0B10000000000000000000000000000000);
  assert.equal(493, 0o755);
  assert.equal(420, 0O644);
});


// Template strings
QUnit.test("Template strings", function (assert) {
  assert.equal("Hi\n5!", `Hi\n${2+3}!`);
  /* does not work on TypeScript
  assert.equal("Hi\\n5!", String.raw`Hi\n${2+3}!`);
  */
});

// Object initializer: shorthand property names
QUnit.test("Object initializer: shorthand property names", function (assert) {
  let a = "foo", b = 42, c = {};
  assert.notStrictEqual({a: a, b: b, c: c}, {a, b, c});
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
  let o = {
    method(x, y) { return [x, y]; },
    /* does not work on TypeScript (target=es3)
    get property() { return this._property; },
    set property(value) { this._property = value; },
    */
    /* does not work on TypeScript
    * generator(i) { yield i; yield i+1; }
    */
  }
  
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
  let [a0, a1] = [1, 2];
  assert.equal(1, a0);
  assert.equal(2, a1);
  
  let [b0, b1, ...bRest] = [1, 2, 3, 4, 5];
  assert.equal(1, b0);
  assert.equal(2, b1);
  assert.notStrictEqual([3, 4, 5], bRest);
  
  // Swapping variables
  let c0 = 1, c1 = 3;
  [c0, c1] = [c1, c0];
  assert.equal(3, c0);
  assert.equal(1, c1);
  
  // Multiple-value returns
  function funcK(...args) { return args; }
  let [d0, d1] = funcK(1, 2);
  assert.equal(1, d0);
  assert.equal(2, d1);
  
  // Ignoring some returned values
  let [e0, , e2] = funcK(1, 2, 3);
  assert.equal(1, e0);
  assert.equal(3, e2);
  
  // Object destructuring
  let {f0, f1} = {f0: 1, f1: 2};
  assert.equal(1, f0);
  assert.equal(2, f1);
  let {foo: g0, bar: g1} = {foo: 1, bar: 2};
  assert.equal(1, g0);
  assert.equal(2, g1);
  
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
  const x = 1;
  assert.equal(1, x);
});
      
// let
QUnit.test("let", function (assert) {
  let x = 0;
  if (true) {
    let x = 2;
    assert.equal(2, x);
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
