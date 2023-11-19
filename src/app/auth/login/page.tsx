'use client'

import login from '@/app/api/auth/login';
import { Button, Checkbox, Form, Input } from 'antd';
import Swal from 'sweetalert2';

export default function Page() {
    const onFinish = async ( values: any ) => {
        const userData = {
            email: values.email,
            password: values.password,
        };
        login( userData );
    };


    const onFinishFailed = ( errorInfo: any ) => {
        Swal.fire( {
            icon: "error",
            title: "Ups...",
            text: "El usuario o la contraseña son incorrectos",
        } );

    };

    type FieldType = {
        email?: string;
        password?: string;
        remember?: string;
    };


    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }, { max: 50 }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
}
