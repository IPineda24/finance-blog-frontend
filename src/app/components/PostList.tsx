'use client'
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const PostList = ( { posts }: any ) => {
    // Estado local para manejar los likes y el estado del botón de "Like"
    const [likes, setLikes] = useState<number[]>( posts.map( ( post: any ) => post.likes ) );
    const [likedPosts, setLikedPosts] = useState<boolean[]>( posts.map( () => false ) );

    // Función para manejar el clic en el botón "Like"
    const handleLike = ( index: number ) => {
        const newLikes = [...likes];
        const newLikedPosts = [...likedPosts];

        // Incrementar o disminuir los likes según el estado actual
        newLikes[index] = likedPosts[index] ? newLikes[index] - 1 : newLikes[index] + 1;
        // Cambiar el estado del botón de "Like"
        newLikedPosts[index] = !likedPosts[index];

        // Actualizar los estados
        setLikes( newLikes );
        setLikedPosts( newLikedPosts );
    };

    // Puedes utilizar useEffect para actualizar los likes iniciales si cambian desde la API
    useEffect( () => {
        setLikes( posts.map( ( post: any ) => post.likes ) );
    }, [posts] );

    return (
        <div className="max-w-2xl mx-auto ">
            {posts.map( ( post: any, index: number ) => (
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
                            {/* Utilizar el color rojo si el post está liked */}
                            <button
                                className={`text-xs text-gray-500 ${likedPosts[index] ? 'text-red-500' : ''}`}
                                onClick={() => handleLike( index )}
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
