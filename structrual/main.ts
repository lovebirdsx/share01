//#region 结构化类型系统

interface Foo {
    name: string;
}

interface Bar {
    name: string;
}

function f1(foo: Foo) {
    console.log(foo.name);
}

const bar: Bar = { name: 'hello' };
f1(bar);

//#endregion

//#region 结构化类型系统的好处

interface Point {
    x: number;
    y: number;
}

function f2(p: Point) {}

const p1 = { x: 1, y: 1 };
f2(p1);
const p2 =  { x: 1, y: 1, z: 1 };
f2(p2)

//#endregion

//#region 结构化类型系统的问题

declare function getPost(postId: number): Post;
declare function getUser(userId: number): User;

interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    authorId: number;
    title: string;
    body: string;
}

function authorOfPost(postId: number) {
    const post = getPost(postId);
    return getUser(post.id);
}

//#endregion
