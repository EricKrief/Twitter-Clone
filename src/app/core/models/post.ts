export interface Post {
    _id: string,
    text: string,
    userId: string,
    username: string,
    postDate: string,
    stars: number,
    starredByMe: boolean,
    avatarUrl: string
}