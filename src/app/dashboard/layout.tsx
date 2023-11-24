import type { Metadata } from 'next'
import Link from 'next/link'
import session from '@/app/validations'
import Nav from '@/app/components/Nav'
import './global.css'

export default async function DashboardLayout( {
    children,
}: {
    children: React.ReactNode
} ) {

    const isLogin = session();
    if ( await isLogin ) {
        return (
            <html lang="en" suppressHydrationWarning={true} >

                <body>
                    <header className='sticky top-0 z-50' >
                        <Nav user={await isLogin} />
                    </header>
                    {children}
                </body>
            </html >
        );
    } else {
        return (

            <html lang="en" suppressHydrationWarning={true}>
                <body>

                    <div>
                        <div>Usted no está autorizado para ver esta página.</div>

                        <Link href="/auth/login"> Iniciar sesión </Link>
                        <Link href="/auth/register"> Crear una cuenta</Link>

                    </div>

                </body>
            </html>

        )
    }
}

