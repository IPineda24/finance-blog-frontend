'use client';
import React, { useState, useEffect } from 'react';
import handleLikes from '@/app/api/post/like';
import { format } from 'date-fns';


interface Post {
    id: number;
    title: string;
    description: string;
    likes: number;
    userId: string;
    createdAt: string;
    createdBy: {
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: string;
        deleted: boolean;
    };
    receivedLikes: {
        id: string;
        userId: string;
        postId: string;
        createdAt: string;
    }[];
}

interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ( { posts } ) => {
    const [likes, setLikes] = useState<number[]>( [] );
    const [likedPosts, setLikedPosts] = useState<boolean[]>( [] );
    const userId = localStorage.getItem( 'userId' );

    const handleLike = async ( index: number, postId: number ) => {
        try {
            const updatedLikes = await handleLikes( postId );
            const newLikes = [...likes];
            const newLikedPosts = [...likedPosts];

            newLikes[index] = updatedLikes;
            newLikedPosts[index] = !likedPosts[index];

            setLikes( newLikes );
            setLikedPosts( newLikedPosts );
        } catch ( error ) {
            console.error( 'Error al dar like al post', error );
        }
    };

    useEffect( () => {
        setLikes( posts.map( ( post ) => post.likes ) );
        setLikedPosts(
            posts.map( ( post ) =>
                post.receivedLikes.some( ( like ) => like.userId === userId )
            )
        );
    }, [posts, userId] );

    return (
        <div className="max-w-2xl mx-auto">
            {posts.map( ( post: Post, index: number ) => (
                <div key={post.id} className="border bg-white border-gray-300 mb-4 rounded overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center mb-2">
                            <div>
                                <p className="text-sm font-semibold text-gray-600">{post.createdBy.username}</p>
                                <p className="text-xs text-gray-500">{format( new Date( post.createdAt ), 'dd/MM/yyyy h:mm a' )}</p>
                            </div>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                        <p className="text-sm mb-4">{post.description}</p>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center space-x-2">
                            <button
                                className={`text-xs text-gray-500 ${likedPosts[index] ? 'text-red-500' : ''}`}
                                onClick={() => handleLike( index, post.id )}
                            >
                                Like
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{likes[index]} likes</p>
                    </div>
                </div>
            ) )}
        </div>
    );
};

export default PostList;
