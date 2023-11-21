// components/PostEditList.tsx
import React from 'react';
import { format } from 'date-fns';
import { updatePost } from '@/app/api/post/myPost';

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
interface PostEditListProps {
    posts: Post[];
}

const PostEditList: React.FC<PostEditListProps> = ( { posts } ) => {
    const handleEditPost = async ( postId: number ) => {
        // Implement your logic for editing the post, e.g., opening a modal
        console.log( "Editing post:", postId );
        // You can use state to manage the editing form/modal visibility

        // Example: Update the post with some data
        const updatedData = {
            // Provide the updated data for the post
        };

        try {
            const success = await updatePost( postId, updatedData );
            if ( success ) {
                console.log( 'Post updated successfully' );
            } else {
                console.error( 'Failed to update post' );
                // Handle error, e.g., show an error message
            }
        } catch ( error ) {
            console.error( 'Error updating post:', error );
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {posts.map( ( post: Post ) => (
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
                                className="text-xs text-gray-500 ml-2"
                                onClick={() => handleEditPost( post.id )}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            ) )}
        </div>
    );
};

export default PostEditList;
