'use client';
import register from '@/app/api/auth/register';
import { Button, Form, Input } from 'antd';
import Swal from 'sweetalert2';
import Image from 'next/image';
import './main.css'; // Import the same styles used in the login component

interface FormValues {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const onFinish = async ( values: FormValues ) => {
    const registerData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    register( registerData );
  };

  const onFinishFailed = ( errorInfo: any ) => {
    Swal.fire( {
      icon: 'error',
      title: 'Ups...',
      text: 'El usuario, correo o la contraseña son incorrectos',
    } );
  };

  return (
    <div className="flex h-screen">
      {/* Fondo Verde (Oculto en dispositivos móviles) */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bgo">
        <Image src="/FToe.svg" alt="Fondo Verde" width={300} height={300} />
      </div>

      {/* Fondo Negro con Formulario */}
      <div className="w-full md:flex-1 flex items-center justify-center p-8 bgo">
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
          <h1 className="text-2xl font-bold mb-6">Register</h1>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }, { pattern: /^[a-zA-Z0-9]+$/, message: 'El nombre de usuario no puede contener espacios en blanco.' }, { min: 3, message: 'El nombre de usuario debe contener al menos 3 caracteres.' }, { max: 20, message: 'El nombre de usuario debe contener menos de 20 caracteres.' }, { type: 'string' }, { whitespace: false }, { pattern: /^[a-zA-Z0-9]+$/, message: 'El nombre de usuario no puede contener espacios en blanco.' }]}
          >
            <Input className="w-full focus:outline-none focus:ring focus:border-green-500" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email' }, { whitespace: false }, { pattern: /^\S+@\S+\.\S+$/, message: 'El email no puede contener espacios en blanco.' }, { max: 50 }]}
          >
            <Input className="w-full focus:outline-none focus:ring focus:border-green-500" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }, { min: 6 }, { max: 20 }, { type: 'string' }, { whitespace: false }, { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, message: 'La contraseña debe contener al menos 6 caracteres, incluyendo mayúsculas/minúsculas y números.' }]}
          >
            <Input.Password
              className="w-full focus:outline-none focus:ring focus:border-green-500"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ md: { offset: 8, span: 16 } }}>
            <Button
              type="default"
              htmlType="submit"
              className="w-full text-white font-semibold bg-green-700 hover:bg-green-800 border-green-800 hover:text-white"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
