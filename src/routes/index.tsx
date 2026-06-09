import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M Mohamed Rasool Raheesh — AI & Machine Learning Engineer" },
      {
        name: "description",
        content:
          "Portfolio of M Mohamed Rasool Raheesh — AI & Machine Learning Engineer building intelligent systems, predictive models and impactful applications.",
      },
      { name: "author", content: "M Mohamed Rasool Raheesh" },
      { property: "og:title", content: "M Mohamed Rasool Raheesh — AI & ML Engineer" },
      {
        property: "og:description",
        content:
          "Building AI that solves real problems. Intelligent systems, predictive solutions and impactful applications.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
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
