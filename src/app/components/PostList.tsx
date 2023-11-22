'use client';
import React, { useState, useEffect } from 'react';
import handleLikes from '@/app/api/post/like';
import { format } from 'date-fns';
import { Input, Button } from 'antd';
import { Dropdown, Menu } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Post } from '@/app/interfaces/types';
interface PostListProps {
    posts: Post[];
}
const { TextArea } = Input;

const PostList: React.FC<PostListProps> = ( { posts } ) => {
    const [likes, setLikes] = useState<number[]>( [] );
    const [likedPosts, setLikedPosts] = useState<boolean[]>( [] );
    const [newComment, setNewComment] = useState<string>( '' );
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

    const handleAddComment = ( index: number, postId: number ) => {
        // ... (implementa la lógica para agregar comentarios)
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
                                <p className="text-xs text-gray-500">
                                    {format( new Date( post.createdAt ), 'dd/MM/yyyy h:mm a' )}
                                </p>
                            </div>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                        <p className="text-sm mb-4">{post.description}</p>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center space-x-2">
                            <Button
                                type="text"
                                icon={<HeartOutlined />}
                                className={`text-xs text-gray-500 ${likedPosts[index] ? 'text-red-500' : ''}`}
                                onClick={() => handleLike( index, post.id )}
                            >
                                Like
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{likes[index]} likes</p>

                        {/* Comentarios usando Ant Design */}
                        <div className="mt-4 max-h-36 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300" style={{ overflowX: 'hidden' }}>
                            {post.comments.map( ( comment ) => (
                                <div key={comment.id} className="mb-4 border-b pb-2">
                                    <p className="text-lg font-bold">{comment.user.username}</p>
                                    <p className="text-gray-700">{comment.comment}</p>
                                    <span className="text-gray-500 block">{format( new Date( comment.createdAt ), 'dd/MM/yyyy h:mm a' )}</span>
                                </div>
                            ) )}
                        </div>

                        {/* Formulario para agregar comentarios usando Ant Design */}
                        <div className="mt-2">
                            <TextArea
                                rows={3}
                                placeholder="Añadir un comentario..."
                                value={newComment}
                                onChange={( e ) => setNewComment( e.target.value )}
                            />
                            <Button type="primary" onClick={() => handleAddComment( index, post.id )}>
                                Publicar
                            </Button>
                        </div>
                    </div>
                </div>
            ) )}
        </div>
    );
};

export default PostList;
