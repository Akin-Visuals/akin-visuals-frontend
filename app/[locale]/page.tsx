import Navbar from '@/components/layout/Navbar';
import NowEditing from '@/components/layout/NowEditing';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Services from '@/components/sections/Services';
// import CaseStudies from '@/components/sections/CaseStudies';
import Contact from '@/components/sections/Contact';
import GsapInit from '@/components/ui/GsapInit';
import FadeUpInit from '@/components/ui/FadeUpInit';
import StarField from '@/components/ui/StarField';
import { fetchYtVideos } from '@/lib/youtube';
import { YT_VIDEOS } from '@/lib/data';

export default async function HomePage() {
  const ytVideos = await fetchYtVideos().catch(() => YT_VIDEOS);

  return (
    <>
      {/* Global UI */}
      <StarField />
      <div id="grain" aria-hidden="true" />
      <div id="cursor-dot"  aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
      <div id="progress-bar" />
      <NowEditing />

      <Navbar />

      <main className="overflow-x-clip">
        <Hero />
        <Services />
        <Portfolio ytVideos={ytVideos} />
        {/* <CaseStudies /> */}
        <Testimonials />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Client-side init */}
      <GsapInit />
      <FadeUpInit />
    </>
  );
}
