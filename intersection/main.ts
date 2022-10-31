//#region Util
type Equal<T, U> = T extends U ? (U extends T ? true : false) : false;
type Expect<T extends true> = T;
type ExpectNot<T extends false> = T;
//#endregion

//#region 字面变量的交集

type T1 = 'a' | 'b';
type U1 = 'b' | 'c';
type R1 = T1 & U1;

//#endregion

//#region interface的交集1

interface T2 {
    name: string;
}

interface U2 {
    id: number;
}

type R2 = T2 & U2;

//#endregion

//#region 理解interface的交集

interface Foo {
    name: string;
}

interface Bar {
    id: number;
}

const f1: Foo = {
    name: 'f1',
}

const f2: Foo = {
    name: 'f2',
    id: 1,
    balala1: 'wahaha',
} as Foo;

const b1: Bar = {
    name: 'b1',
    id: 2,
    balala2: 'wahaha',
} as Bar;

//#endregion

//#region interface的交集2

interface NamedItem {
    name: string;
    id: number;
}

interface Person {
    name: string;
    id: string;
    age: number;
}

type R3 = NamedItem & Person;

//#endregion
