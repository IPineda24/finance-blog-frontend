'use client';
import login from '@/app/api/auth/login';
import { Button, Checkbox, Form, Input } from 'antd';
import Swal from 'sweetalert2';
import Image from 'next/image'
import './main.css';

interface FormValues {
    email: string;
    password: string;
}

export default function Page() {

    const onFinish = async ( values: FormValues ) => {
        const userData = {
            email: values.email,
            password: values.password,
        };
        login( userData );
    };

    const onFinishFailed = ( errorInfo: object ) => {
        Swal.fire( {
            icon: 'error',
            title: 'Ups...',
            text: 'El usuario o la contraseña son incorrectos',
        } );
    };

    return (
        <div className="flex flex-row h-screen  bgo">
            {/* Fondo Verde (Oculto en dispositivos móviles) */}
            <div className="hidden basis-3/4 lg:flex lg:flex-1 lg:items-center lg:justify-center bgo22 bgo rounded-br-full">
                <Image
                    src="/FToe.svg"
                    alt="Fondo Verde"
                    width={300}
                    height={300}
                    priority={true}
                    quality={100}
                />
            </div>

            {/* Fondo Negro con Formulario */}
            <div className="w-full basis-1/4 md:flex-1 flex items-center justify-center p-8 bgo ">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 400 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="bg-gray-700 p-6 rounded-lg shadow-md text-white w-full lg:max-w-md"
                >
                    <h1 className="text-2xl font-bold mb-6">Login</h1>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { max: 50 },
                        ]}
                    >
                        <Input className="w-full focus:outline-none focus:ring focus:border-green-500" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            className="w-full focus:outline-none focus:ring focus:border-green-500"
                        />
                    </Form.Item>

                    <div className='grid w-full'>

                        <Form.Item wrapperCol={{ md: { offset: 8, span: 16 } }}>
                            <Button
                                type="default"
                                htmlType="submit"
                                className=" w-full bgo2"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
}
