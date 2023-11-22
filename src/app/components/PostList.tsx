'use client';

import React, { useState, useEffect } from 'react';
import handleLikes from '@/app/api/post/like';
import { format } from 'date-fns';
import { Input, Button } from 'antd';
import { CommentOutlined, HeartOutlined, SendOutlined } from '@ant-design/icons';
import { Post } from '@/app/interfaces/types';
import { addComment } from '@/app/api/post/comment';
import { getPost } from '../api/post/myPost';

const { TextArea } = Input;

interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ( { posts } ) => {
    const [likes, setLikes] = useState<number[]>( [] );
    const [likedPosts, setLikedPosts] = useState<boolean[]>( [] );
    const [newComment, setNewComment] = useState<string>( '' );
    const [showComments, setShowComments] = useState<boolean[]>( [] );
    const userId = localStorage.getItem( 'userId' );

    useEffect( () => {
        setLikes( posts.map( ( post ) => post.likes ) );
        setLikedPosts(
            posts.map( ( post ) =>
                post.receivedLikes.some( ( like ) => like.userId === userId )
            )
        );
        //que se actualice el nuevo comentario 
        setShowComments( new Array( posts.length ).fill( false ) );
    }, [posts, newComment] );

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

    const handleAddComment = async ( index: number, postId: number ) => {
        try {
            if ( newComment.trim() === '' ) {
                return;
            }

            const response = await addComment( postId, newComment );
            const updatedPosts = [...posts];
            updatedPosts[index].comments.push( response );

            setNewComment( '' );

            window.location.reload();
        } catch ( error ) {
            console.error( 'Error al agregar comentario', error );
        }
    };
    const toggleComments = ( index: number ) => {
        const newShowComments = [...showComments];
        newShowComments[index] = !showComments[index];
        setShowComments( newShowComments );
    };



    return (
        <div className="max-w-2xl mx-auto">
            {posts.map( ( post: Post, index: number ) => (
                <div key={post.id} className="bg-white rounded-md overflow-hidden shadow-md mb-4">
                    {/* Contenido del post */}
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

                    {/* Likes y comentarios */}
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Button
                                type="text"
                                icon={<HeartOutlined />}
                                className={`text-xs text-gray-500 ${likedPosts[index] ? 'text-red-500' : ''}`}
                                onClick={() => handleLike( index, post.id )}
                            >
                            </Button>
                            <Button icon={<CommentOutlined />} type="text" className=' text-xs text-gray-500' onClick={() => toggleComments( index )}>
                                {showComments[index] ? '' : ''}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">{likes[index]} Me gusta</p>
                    </div>

                    {/* Comentarios */}
                    {showComments[index] && (
                        <div className="p-4 max-h-36 overflow-y-auto text-sm">

                            {( !post.comments || post.comments.length === 0 ) ? 'No hay comentarios' : ''}
                            {post.comments.map( ( comment ) => (
                                <div key={comment.id} className="mb-4">
                                    <p className="text-sm text-gray-700 font-semibold">@{comment.user.username}</p>
                                    <p className="text-gray-700 text-xs">{comment.comment}</p>
                                    <span className="text-gray-500 block text-xs">{format( new Date( comment.createdAt ), 'dd/MM/yyyy h:mm a' )}</span>
                                </div>
                            ) )}
                        </div>
                    )}

                    {/* Formulario de comentarios */}
                    <div className="p-4">
                        <div className="flex items-center space-x-2">
                            <TextArea
                                className='w-full h-4 text-xs'
                                rows={1}
                                placeholder="Añadir un comentario..."
                                onChange={( e ) => setNewComment( e.target.value )}
                            />
                            <Button icon={<SendOutlined />} className='text-xs' type="default" onClick={() => handleAddComment( index, post.id )}>


                            </Button>
                        </div>
                    </div>
                </div>
            ) )}
        </div>
    );
};

export default PostList;
