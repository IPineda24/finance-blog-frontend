// dashboard/page.tsx
'use client'
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import createPost from '@/app/api/post/createPost';

const CreatePost: React.FC = () => {
    const onFinish = async ( values: { title: string; description: string } ) => {
        try {
            await createPost( values );
            message.success( 'Post creado exitosamente' );
        } catch ( error ) {
            message.error( 'Error al crear el post. Por favor, inténtalo de nuevo.' );
        }
    };

    return (
        <div className="bg-gray-800 p-4">
            <h1 className="text-2xl font-bold text-white text-center mb-6">Crear Nuevo Post</h1>
            <Form onFinish={onFinish}>
                <Form.Item
                    label="Título"
                    name="title"
                    rules={[{ required: true, message: 'Por favor, ingresa el título' }, { max: 100 }, { min: 5 }, { whitespace: true }, { type: 'string' }, { message: 'Por favor, ingresa un título válido' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Descripción"
                    name="description"
                    rules={[{ required: true, message: 'Por favor, ingresa la descripción' }, { max: 1000 }, { min: 10 }, { whitespace: true }, { type: 'string' }, { message: 'Por favor, ingresa una descripción válida' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Crear Post
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreatePost;
