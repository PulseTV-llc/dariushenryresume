import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Projects />
      <Services />
      <Skills />
      <Contact />
    </main>
  );
}
