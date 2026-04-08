import Hero from '@/components/Hero';
import WhyMe from '@/components/WhyMe';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <WhyMe />
      <Projects />
      <Services />
      <Contact />
      <ChatBot />
    </main>
  );
}
