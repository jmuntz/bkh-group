import { Metadata } from 'next';
import Nav from '../../components/Nav';
import HeroV1 from '../../components/v1/Hero';
import ServicesV1 from '../../components/v1/Services';
import FeaturedProjectV1 from '../../components/v1/FeaturedProject';
import AboutV1 from '../../components/v1/About';
import ProjectsV1 from '../../components/v1/Projects';
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

/** WordPress-aligned landing: no scroll fade-ins. */
export default function HomeV1() {
  return (
    <div className="bkh-theme-v2 min-h-screen bg-black text-white">
      <Nav />
      <main>
        <HeroV1 />
        <ServicesV1 />
        <FeaturedProjectV1 />
        <AboutV1 />
        <ProjectsV1 />
        <HireV2 />
        <ContactV2 />
      </main>
      <FooterV2 homeHref="/v1" />
      <PreviewToolbar variant="v1" />
    </div>
  );
}
