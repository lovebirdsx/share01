//#region never的底层表示

const foo = () => { throw new Error() };
const bar = () => { while (true) {} };

function fn(x: number | string) {
    if (typeof x === 'number') {
        console.log(x);
    } else if (typeof x === 'string') {
        console.log(x);
    } else {
        console.log(x);
    }
}

//#endregion
