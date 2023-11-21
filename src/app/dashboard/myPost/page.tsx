// dashboard/myPost/page.tsx
'use client'
import React, { useEffect, useState } from 'react';
import PostEditList from '@/app/components/postEditList';
import { getPost } from '@/app/api/post/myPost';

interface Post {
    id: number;
    title: string;
    description: string;
    likes: number;
    createdAt: string;
    createdBy: {
        id: number;
        username: string;
    };
}

const MyPostPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>( [] );

    const fetchPosts = async () => {
        try {
            const fetchedPosts: Post[] = await getPost();
            setPosts( fetchedPosts );
        } catch ( error ) {
            console.error( 'Error fetching posts:', error );
            // Handle error, e.g., show an error message
        }
    };

    useEffect( () => {
        fetchPosts();
    }, [] );

    const updatePosts = async () => {
        await fetchPosts();
    };

    return (
        <div className="bg-gray-800">
            <div className="bg-gray-800">
                <h1 className="text-2xl font-bold text-white text-center mb-6 h-2 bg-green-800">My Posts</h1>
                <PostEditList posts={posts} onPostUpdate={updatePosts} />
            </div>
        </div>
    );
};

export default MyPostPage;