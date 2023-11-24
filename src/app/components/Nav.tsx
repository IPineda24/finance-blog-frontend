'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import closeSession from '@/app/utils/deleteToken';
import './main.css';
import { CloseOutlined, HeartOutlined, HomeOutlined, UploadOutlined } from '@ant-design/icons';
interface User {
    user: {
        id: number;
        username: string;
    };
}


const Nav: React.FC<User> = ( { user } ) => {
    const [isMenuOpen, setIsMenuOpen] = useState( false );

    const toggleMenu = () => {
        setIsMenuOpen( !isMenuOpen );
    };

    const close = () => {

        closeSession();

    };

    useEffect( () => {
        if ( user && user.id !== undefined && user.id !== null ) {
            localStorage.setItem( 'userId', user.id.toString() );
        }
    }, [] );

    return (
        <div className='w-full sticky top-0 ' >
            <div>
                <nav className="bg-gray-800 p-4 sticky ">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className='flex justify-center items-center gap-2'>
                            <Image
                                src="/logo.svg"
                                alt="Fondo Verde"
                                width={50}
                                height={10}
                                className='h-full w-13'
                            />

                            <div className='p-4 text-primary'>Bienvenido @{user.username}</div>
                        </div>

                        {/* Menú de hamburguesa para dispositivos móviles */}
                        <div className="lg:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        {/* Menú de navegación */}
                        <ul className={`  ${isMenuOpen ? 'block absolute' : 'hidden '}  top-16 left-0 bg-gray-800 lg:flex lg:items-center lg:justify-center w-full lg:w-auto`}>
                            <li>
                                <Link href="/dashboard">
                                    <div className="text-white block py-2 px-4 bgo3 text-primary " > <HomeOutlined /> Inicio</div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/createPost">
                                    <div className="text-white block py-2 px-4 bgo3 text-primary" ><UploadOutlined /> Crear Publicación </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/myPost">
                                    <div className="text-white block py-2 px-4 bgo3 text-primary"><HeartOutlined /> Mis publicaciones </div>
                                </Link>
                            </li>
                            <li className="md:ml-auto">
                                <Link
                                    onClick={close}
                                    href="/auth/login" >
                                    <div className="text-white block py-2 px-4 bgo3 text-primary"> <CloseOutlined /> Cerrar Sesión</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Nav;
