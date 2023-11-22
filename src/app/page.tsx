// Importa los estilos CSS
import styles from './home.module.css';
import Link from 'next/link';
import Image from 'next/image';
export default function Home() {
  return (
    <main className={styles.container}>
      <Image
        src="/FToe.svg"
        alt="Fortech"
        width={50}
        height={50}
        className={styles.logo}

      />


      <h1 className={styles.title}>Fortech</h1>
      <p className={styles.subtitle}>Tu plataforma para publicar contenido financiero</p>
      <Link href="/auth/register">
        <button className={styles.ctaButton}>Empezar</button>
      </Link>
    </main>

  );
}
