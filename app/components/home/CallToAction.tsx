// app/components/home/CallToAction.tsx
import Link from 'next/link';
import styles from './CallToAction.module.css'; // Create CallToAction.module.css for styling

const CallToAction = () => {
  return (
    <section className={styles.cta}>
      <h2>Take control of your subscriptions.</h2>
      <p>
        Upload your bank statement and have
        our tool analyse your subscription spend,
        then view in an easy to read snapshot.
      </p>
      <Link href="/scan" className={styles.ctaButton}>
        Get started →
      </Link>
    </section>
  );
};

export default CallToAction;