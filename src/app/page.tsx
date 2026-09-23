import { SiteShell } from "@/components/layout/site-shell";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { TechStack } from "@/components/sections/tech-stack";
import { Projects } from "@/components/sections/projects";
import { GithubIntegration } from "@/components/sections/github-integration";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <SiteShell>
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Experience />
        <GithubIntegration />
        <Contact />
      </main>
      <Footer />
    </SiteShell>
  );
}
