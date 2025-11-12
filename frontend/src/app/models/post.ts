export interface Post {
    _id?: string,
    postId?: string,
    author?: string,
    title?: string,
    content?: string,
    mediaID?: string,
    likes_usernames?: [string],
    reposts_usernames?: [string],
    createdAt?: Date,
    updatedAt?: Date,
}