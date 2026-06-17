import { Nav } from "@/components/portfolio/Nav";
import { IntroSplash } from "@/components/portfolio/IntroSplash";
import { HeroRed } from "@/components/portfolio/HeroRed";
import { HelloAbout } from "@/components/portfolio/HelloAbout";
import { Expertise } from "@/components/portfolio/Expertise";
import { SkillsStack } from "@/components/portfolio/SkillsStack";
import { ProjectsWork } from "@/components/portfolio/ProjectsWork";
import { CertificationsCarousel } from "@/components/portfolio/CertificationsCarousel";
import { ContactForm } from "@/components/portfolio/ContactForm";

export function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <IntroSplash />
      <Nav />
      <main>
        <HeroRed />
        <HelloAbout />
        <Expertise />
        <SkillsStack />
        <ProjectsWork />
        <CertificationsCarousel />
        <ContactForm />
      </main>
    </div>
  );
}
