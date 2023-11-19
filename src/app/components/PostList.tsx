//Components/PostList.tsx
import React from 'react';
const PostList = ( { posts }: any ) => {
    return (
        <div className="max-w-2xl mx-auto">
            {posts.map( ( post: any ) => (
                <div key={post.id} className="border border-gray-300 mb-4 rounded overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center mb-2">
                            <div>
                                <p className="text-sm font-medium">{post.createdBy.username}</p>
                                <p className="text-xs text-gray-500">{post.createdAt}</p>
                            </div>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                        <p className="text-sm mb-4">{post.description}</p>
                    </div>
                    <div className="bg-gray-200 h-40"></div>
                    <div className="p-4">
                        <p className="text-xs text-gray-500 mt-2">{post.likes} likes</p>
                    </div>
                </div>
            ) )}
        </div>
    );
};

export default PostList;
