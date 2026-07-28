import { Metadata } from 'next';
import Nav from '../../components/Nav';
import ScrollMotion from '../../components/v2/ScrollMotion';
import HeroV2 from '../../components/v2/Hero';
import ServicesV2 from '../../components/v2/Services';
import FeaturedProjectV2 from '../../components/v2/FeaturedProject';
import AboutStack from '../../components/v2/AboutStack';
import ProjectsV2 from '../../components/mockups/v3/Projects';
import HireV2 from '../../components/v2/Hire';
import ContactV2 from '../../components/v2/Contact';
import FooterV2 from '../../components/v2/Footer';
import PreviewToolbar from '../../components/PreviewToolbar';

export const metadata: Metadata = {
  title: 'BKH Group | Vertically Integrated Structural Solutions',
  description:
    'Celebrating 30 years as a leading vertically integrated structural construction solutions partner across commercial, residential and infrastructure projects Australia-wide.',
  openGraph: {
    title: 'BKH Group | Vertically Integrated Structural Solutions',
    description:
      'Formwork, concrete, scaffold and jumpform packages for tier one commercial, residential and infrastructure developments.',
    images: ['/images/hero-construction.jpg'],
  },
};

export default function HomeV2() {
  return (
    <ScrollMotion className="bkh-theme-v2 min-h-screen bg-black text-white">
      <Nav />
      <main>
        <HeroV2 />
        <ServicesV2 />
        <FeaturedProjectV2 />
        <AboutStack />
        <ProjectsV2 />
        <HireV2 />
        <ContactV2 />
      </main>
      <FooterV2 homeHref="/v2" />
      <PreviewToolbar variant="v2" />
    </ScrollMotion>
  );
}
