import { Nav } from "@/components/portfolio/Nav";
import { Hero3D } from "@/components/portfolio/Hero3D";
import { SocialRail } from "@/components/portfolio/SocialRail";
import {
  About,
  Certifications,
  Contact,
  Experience,
  Footer,
  Projects,
  Skills,
} from "@/components/portfolio/Sections";
import { CursorSpotlight, GoldParticles } from "@/components/portfolio/Particles";

export function App() {
  return (
    <div className="dark relative min-h-screen bg-background text-foreground">
      <CursorSpotlight />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <GoldParticles />
      </div>
      <div className="relative z-10">
        <Nav />
        <SocialRail />
        <main>
          <Hero3D />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
