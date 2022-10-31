//#region 结构化类型系统的问题

type PostId = number & {__brand: 'postId' }
type UserId = number & {__brand: 'userId' }

declare function getPost(postId: PostId): Post;
declare function getUser(userId: UserId): User;

interface User {
    id: UserId;
    name: string;
}

interface Post {
    id: PostId;
    authorId: UserId;
    title: string;
    body: string;
}

function authorOfPost(postId: PostId) {
    const post = getPost(postId);
    return getUser(post.authorId);
}

//#endregion
