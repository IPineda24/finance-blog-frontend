'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState( false );

    const toggleMenu = () => {
        setIsMenuOpen( !isMenuOpen );
    };

    return (
        <div className=''>
            <div>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Image
                            src="/logo.svg"
                            alt="Fondo Verde"
                            width={50}
                            height={50}
                        />

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
                        <ul className={`lg:flex lg:items-center  ${isMenuOpen ? 'block absolute' : 'hidden '}  top-16 left-0 bg-gray-800 md:flex md:items-center md:justify-center w-full md:w-auto`}>
                            <li>
                                <Link href="/dashboard">
                                    <div className="text-white block py-2 px-4 hover:bg-gray-700">Publicaciones 🏠</div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/createPost">
                                    <div className="text-white block py-2 px-4 hover:bg-gray-700">Crear Post ⬆️</div>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <div className="text-white block py-2 px-4 hover:bg-gray-700">Mis Post ❤️</div>
                                </Link>
                            </li>
                            <li className="md:ml-auto">
                                <Link href="#">
                                    <div className="text-white block py-2 px-4 hover:bg-gray-700">Cerrar Sesión ☠️</div>
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
