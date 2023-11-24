// Importa los estilos CSS
import styles from './home.module.css';
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
  return (
    <main className={styles.container}>
      <Image
        src="/logo.svg"
        alt="Fortech"
        width={60}
        height={60}



      />


      <h1 className={styles.title}>Fortech</h1>
      <p className={styles.subtitle}>Tu plataforma para publicar contenido <span className='text-accent'>financiero</span></p>
      <div className='flex justify-between items-center'>
        <Link href="/auth/register">
          <button className={styles.ctaButton}>Registrarme </button>
        </Link>
        <Link className='pl-4' href="/auth/login">
          <button className={styles.ctaButton2}>Iniciar sesion </button>
        </Link>
      </div>
    </main>

  );
}
