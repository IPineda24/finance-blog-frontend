'use client'
import register from '@/app/api/auth/register';
import { Button, Checkbox, Form, Input } from 'antd';
import Swal from 'sweetalert2';


export default function Page() {

  const onFinish = ( values: any ) => {
    const registerData = {
      username: values.username,
      email: values.email,
      password: values.password
    }
    register( registerData );
  };

  const onFinishFailed = ( errorInfo: any ) => {
    Swal.fire( {
      icon: "error",
      title: "Ups...",
      text: "El usuario, correo o la contraseña son incorrectos",
    } );
  };

  type FieldType = {
    username?: string;
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
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }, { pattern: /^[a-zA-Z0-9]+$/, message: 'El nombre de usuario no puede contener espacios en blanco.' }, { min: 3, message: 'El nombre de usuario debe contener al menos 3 caracteres.' }, { max: 20, message: 'El nombre de usuario debe contener menos de 20 caracteres.' }, { type: 'string' }, { whitespace: false }, { pattern: /^[a-zA-Z0-9]+$/, message: 'El nombre de usuario no puede contener espacios en blanco.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email' }, { whitespace: false }, { pattern: /^\S+@\S+\.\S+$/, message: 'El email no puede contener espacios en blanco.' }, { max: 50 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }, { min: 6 }, { max: 20 }, { type: 'string' }, { whitespace: false }, { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, message: 'La contraseña debe contener al menos 6 caracteres, incluyendo mayúsculas/minúsculas y números.' }]}
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
