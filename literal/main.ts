//#region 字面量类型

type GreetName = 'world' | 'ts';
function greet(name: GreetName) {
    return `hello, ${name}!`;
}

greet('world');
greet('ts');
// greet('foo');

//#endregion
