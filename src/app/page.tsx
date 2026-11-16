import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { MoreComing } from "@/components/site/MoreComing";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[color:var(--ink)]">
      <Nav />
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Projects />
        <MoreComing />
      </main>
      <Footer />
    </div>
  );
}
