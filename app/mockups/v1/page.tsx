import { Metadata } from 'next';
import Nav from '../../../components/Nav';
import Hero from '../../../components/Hero';
import Services from '../../../components/Services';
import FeaturedProject from '../../../components/FeaturedProject';
import About from '../../../components/About';
import Projects from '../../../components/Projects';
import Hire from '../../../components/Hire';
import Contact from '../../../components/Contact';
import Footer from '../../../components/Footer';

export const metadata: Metadata = {
  title: 'BKH Group | Setting the Future in Concrete',
  description:
    'BKH Group provides formwork, concreting, scaffold and jumpform systems to the tier one construction market across NSW and Australia.',
  openGraph: {
    title: 'BKH Group | Setting the Future in Concrete',
    description:
      'Structural packages including formwork, concrete placement and scaffolding - one point of contact for tier one construction.',
    images: ['/images/hero-construction.jpg'],
  },
};

export default function MockupV1() {
  return (
    <main className="min-h-screen bg-[var(--bkh-page)]">
      <Nav />
      <Hero />
      <Services />
      <FeaturedProject />
      <About />
      <Projects />
      <Hire />
      <Contact />
      <Footer />
    </main>
  );
}
