// dashboard/page.tsx
'use client'
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import createPost from '@/app/api/post/createPost';
import './main.css';

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
        <div className='w-full py-16'>
            <div className="bg-gray-800 p-2 md:p-8  flex items-center justify-center ">
                <div className="bg-white p-2 md:p-8 rounded-md w-full md:max-w-4xl" >
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Crear Nuevo Post</h1>
                    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={onFinish}>
                        <Form.Item
                            label="Título"
                            name="title"
                            rules={[
                                { required: true, message: 'Por favor, ingresa el título' },
                                { max: 100, message: 'El título debe tener como máximo 100 caracteres' },
                                { min: 5, message: 'El título debe tener al menos 5 caracteres' },
                                { whitespace: true, message: 'Por favor, ingresa un título válido' },
                                { type: 'string', message: 'Por favor, ingresa un título válido' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item

                            label="Descripción"
                            name="description"
                            rules={[
                                { required: true, message: 'Por favor, ingresa la descripción' },
                                { max: 1000, message: 'La descripción debe tener como máximo 1000 caracteres' },
                                { min: 10, message: 'La descripción debe tener al menos 10 caracteres' },
                                { whitespace: true, message: 'Por favor, ingresa una descripción válida' },
                                { type: 'string', message: 'Por favor, ingresa una descripción válida' },
                            ]}
                        >
                            <Input.TextArea style={{ height: '200px' }} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button
                                type="default"
                                htmlType="submit"
                                className="w-full text-white font-semibold bg-green-700 hover:bg-green-800 border-green-800 hover:text-white"
                            >
                                Crear Post
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
