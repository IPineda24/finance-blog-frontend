'use client';
import React, { useState } from 'react';
export default function Page() {
    const [email, setEmail] = useState( '' );
    const [password, setPassword] = useState( '' );
    const handleSubmit = ( e: any ) => {
        e.preventDefault();

        console.log( 'Email:', email );
        console.log( 'Password:', password );
    };

    return (
        <div>
            <h1>Login Page</h1>
            <p>Create login like register page</p>
            <form onSubmit={handleSubmit}>
                {/* Asignar las funciones de cambio de estado a los eventos onChange */}
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={( e ) => setEmail( e.target.value )}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={( e ) => setPassword( e.target.value )}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
