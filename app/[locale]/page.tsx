import Navbar from '@/components/layout/Navbar';
import NowEditing from '@/components/layout/NowEditing';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import GsapInit from '@/components/ui/GsapInit';
import FadeUpInit from '@/components/ui/FadeUpInit';

export default function HomePage() {
  return (
    <>
      {/* Global UI */}
      <div id="grain" aria-hidden="true" />
      <div id="cursor-dot"  aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
      <div id="progress-bar" />
      <NowEditing />

      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Portfolio />
        <Testimonials />
        <Services />
        <Contact />
      </main>

      <Footer />

      {/* Client-side init */}
      <GsapInit />
      <FadeUpInit />
    </>
  );
}
