// components/PostEditList.tsx
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
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
    onPostUpdate: () => Promise<void>;
}

const PostEditList: React.FC<PostEditListProps> = ( { posts, onPostUpdate } ) => {
    const [form] = Form.useForm();
    const [editingPostId, setEditingPostId] = useState<number | null>( null );

    const handleEditPost = ( postId: number ) => {
        setEditingPostId( postId );
        form.setFieldsValue( {
            title: posts.find( ( post ) => post.id === postId )?.title,
            description: posts.find( ( post ) => post.id === postId )?.description,
        } );
    };

    const handleCancelEdit = () => {
        setEditingPostId( null );
        form.resetFields();
    };

    const handleUpdatePost = async () => {
        try {
            const values = await form.validateFields();

            const valuesFormatted = {
                title: values.title,
                description: values.description,
            };

            console.log( editingPostId!, valuesFormatted );
            const success = await updatePost( editingPostId!, valuesFormatted );
            if ( success ) {
                console.log( 'Post updated successfully' );
                handleCancelEdit();
                // Llamar a la función de actualización de la lista después de la edición exitosa
                await onPostUpdate();
            } else {
                console.error( 'Failed to update post' );
            }
        } catch ( error ) {
            console.error( 'Error updating post:', error );
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {posts.map( ( post: Post ) => (
                <div key={post.id} className="border bg-white border-gray-300 mb-4 rounded overflow-hidden">
                    {/* ... (existing code) */}
                    <div className="p-4">
                        {editingPostId === post.id ? (
                            <Form form={form} onFinish={handleUpdatePost}>
                                <Form.Item
                                    name="title"
                                    initialValue={post.title}
                                    rules={[
                                        { required: true, message: 'Por favor, ingresa el título' },
                                        { max: 100, message: 'El título debe tener como máximo 100 caracteres' },
                                        { min: 5, message: 'El título debe tener al menos 5 caracteres' },
                                        { whitespace: true, message: 'Por favor, ingresa un título válido' },
                                        { type: 'string', message: 'Por favor, ingresa un título válido' },
                                    ]}
                                >
                                    <Input placeholder="Title" />
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    initialValue={post.description}
                                    rules={[
                                        { required: true, message: 'Por favor, ingresa la descripción' },
                                        { max: 1000, message: 'La descripción debe tener como máximo 1000 caracteres' },
                                        { min: 10, message: 'La descripción debe tener al menos 10 caracteres' },
                                        { whitespace: true, message: 'Por favor, ingresa una descripción válida' },
                                        { type: 'string', message: 'Por favor, ingresa una descripción válida' },
                                    ]}
                                >
                                    <Input.TextArea placeholder="Description" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Update
                                    </Button>
                                    <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
                                        Cancel
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                                <p className="text-sm mb-4">{post.description}</p>
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <div className="flex items-center space-x-2">
                            <button className="text-xs text-gray-500 ml-2" onClick={() => handleEditPost( post.id )}>
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
