// app/components/home/Hero.tsx
import styles from './Hero.module.css'; // Create Hero.module.css for styling

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1>Your Snapshot is waiting.</h1>
      <p>Scroll to take a look.</p>
      {/* Optional: Add scroll down indicator icon */}
      <div className={styles.scrollIndicator}>↓</div>
    </section>
  );
};

export default Hero;