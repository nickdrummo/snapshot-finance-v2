// app/components/home/ProcessSteps.tsx
import styles from './ProcessSteps.module.css'; // Create ProcessSteps.module.css for styling

const ProcessSteps = () => {
  return (
    <section className={styles.process}>
      <div className={styles.step}>
         {/* Replace text with actual icons if available */}
        <span className={styles.icon}>⬆️</span> {/* Placeholder Icon */}
        <p>upload</p>
      </div>
      <div className={styles.step}>
        <span className={styles.icon}>🔍</span> {/* Placeholder Icon */}
        <p>analyse</p>
      </div>
      <div className={styles.step}>
        <span className={styles.icon}>📄</span> {/* Placeholder Icon */}
        <p>snapshot</p>
      </div>
    </section>
  );
};

export default ProcessSteps;