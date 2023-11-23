// types.ts

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    deleted: boolean;
}

export interface ReceivedLike {
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
}

export interface Comment {
    id: string;
    comment: string;
    userId: string;
    postId: string;
    createdAt: string;
    user: User;
}

export interface Post {
    id: number;
    title: string;
    description: string;
    likes: number;
    userId: string;
    createdAt: string;
    createdBy: User;
    receivedLikes: ReceivedLike[];
    comments: Comment[];
}
