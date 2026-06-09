import { Nav } from "@/components/portfolio/Nav";
import {
  About,
  Certifications,
  Contact,
  Experience,
  Footer,
  Hero,
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
        <main>
          <Hero />
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
