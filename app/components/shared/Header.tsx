// app/components/shared/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css'; // Create Header.module.css for styling

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Snapshot Finance</div>
      <nav className={styles.nav}>
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/snapshot">Snapshot</Link>
        {/* Get started button from slides 15/16 [cite: 28, 30] */}
        <Link href="/scan" className={styles.getStarted}>Get started →</Link>
      </nav>
      {/* Text shown in some header variations [cite: 24, 25, 26, 28, 30] */}
      {/* <div className={styles.processHeader}>upload analyse snapshot</div> */}
    </header>
  );
};

export default Header;