import About from '@/components/About';
import Contact from '@/components/Contact';
import Cursor from '@/components/Cursor';
import Hero from '@/components/Hero';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import StatsScroller from '@/components/StatsScroller';
import WorksGrid from '@/components/WorksGrid';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Cursor />
      <main className="site-shell">
        <Hero />
        <About />
        <WorksGrid />
        <StatsScroller />
        <Contact />
      </main>
    </SmoothScrollProvider>
  );
}
