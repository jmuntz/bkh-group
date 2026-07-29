import { Metadata } from 'next';
import Nav from '../../components/Nav';
import ScrollMotion from '../../components/v2/ScrollMotion';
import HeroV3 from '../../components/v3/Hero';
import { StatementAnniversary, StatementPackages } from '../../components/v3/CompanyStatements';
import ServicesV3 from '../../components/v3/Services';
import FeaturedProjectV3 from '../../components/v3/FeaturedProject';
import AboutStackV3 from '../../components/v3/AboutStack';
import ProjectsV3 from '../../components/v3/Projects';
import HireV3 from '../../components/v3/Hire';
import ContactV3 from '../../components/v3/Contact';
import FooterV3 from '../../components/v3/Footer';

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

export default function HomeV3() {
  return (
    <ScrollMotion className="bkh-theme-v3 min-h-screen bg-black text-white">
      <Nav />
      <main>
        <HeroV3 />
        <StatementAnniversary />
        <ServicesV3 />
        <StatementPackages />
        <FeaturedProjectV3 />
        <AboutStackV3 />
        <ProjectsV3 />
        <HireV3 />
        <ContactV3 />
      </main>
      <FooterV3 homeHref="/v3" />
    </ScrollMotion>
  );
}
