//#region 01

function double(x: number | string) {
    if (typeof x === 'number') {
        return 2 * x;
    }
    return (2 * Number(x)).toString();
}

//#endregion

//#region 02

type Square = {
    size: number;
};

type Rectangle = {
    width: number;
    height: number;
};
type Shape = Square | Rectangle;
function area(shape: Shape) {
    if ('size' in shape) {
        return shape.size * shape.size;
    }
    return shape.width * shape.height;
}

//#endregion

//#region 03

type Triangle = {
    type: 'triangle',
    a: number;
    b: number;
    c: number;
}

type Circle = {
    type: 'circle',
    radius: number;
}

type Shape2 = Triangle | Circle;
function area2(shape: Shape2) {
    switch (shape.type) {
        case 'circle':
            return Math.PI * shape.radius * shape.radius;
    
        case 'triangle': {
            const p = (shape.a + shape.b + shape.c) / 2;
            return Math.sqrt(p * (p - shape.a) * (p - shape.b) * (p - shape.c));
        }
    }
}


//#endregion