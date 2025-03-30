// app/page.tsx (Home Page)
import Hero from '@/app/components/home/Hero';
import ProcessSteps from '@/app/components/home/ProcessSteps';
import CallToAction from '@/app/components/home/CallToAction';
import styles from './HomePage.module.css'; // Create HomePage.module.css for styling

export default function HomePage() {
  return (
    // This container might need specific styles for scroll behavior
    <main className={styles.homeContainer}>

        {/* --- Section 1: Visible Initially --- */}
        <Hero />
        <ProcessSteps />

        {/* --- Section 2: Revealed on Scroll --- */}
        {/* Add the 'scrollSection' class or similar for targeting */}
        <div className={styles.scrollSection}>
             <CallToAction />
             {/* You could add more content here that appears on scroll */}
        </div>

    </main>
  );
}