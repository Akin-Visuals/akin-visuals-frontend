import Navbar from '@/app/components/layout/Navbar';
import NowEditing from '@/app/components/layout/NowEditing';
import Footer from '@/app/components/layout/Footer';
import Hero from '@/app/components/sections/Hero';
import About from '@/app/components/sections/About';
import Portfolio from '@/app/components/sections/Portfolio';
import Testimonials from '@/app/components/sections/Testimonials';
import Services from '@/app/components/sections/Services';
import Contact from '@/app/components/sections/Contact';
import GsapInit from '@/app/components/ui/GsapInit';
import FadeUpInit from '@/app/components/ui/FadeUpInit';

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
