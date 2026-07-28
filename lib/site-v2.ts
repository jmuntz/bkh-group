export const site = {
  name: 'BKH Group',
  tagline: 'Setting the Future in Concrete',
  positioning:
    'A leading vertically integrated structural construction solutions partner.',
  phone: '(02) 9671 8700',
  phoneHref: 'tel:+61296718700',
  email: 'enquiries@bkhgroup.com.au',
  address: '378 Vardys Rd, Kings Park NSW 2148',
  headquarters: 'Headquarters in NSW and QLD',
  founded: 1996,
  anniversaryYears: 30,
  url: 'https://www.bkhgroup.com.au',
  social: {
    facebook: 'https://www.facebook.com/TheBKHgroup',
    linkedin: 'https://www.linkedin.com/company/13668283',
    instagram: 'https://www.instagram.com/bkh.group/',
  },
} as const;

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Sales & Hire', href: '#hire' },
  { label: 'Contact', href: '#contact' },
] as const;

export const services = [
  {
    id: 'formwork',
    title: 'Formwork',
    summary:
      'Formwork systems and shoring tailored to project requirements, with in-house capability across commercial, residential and infrastructure works.',
    href: '#services',
    image: '/images/formwork.jpg',
  },
  {
    id: 'concrete',
    title: 'Concrete',
    summary:
      'Complete concrete placement for high rise, retail, schools, hospitals, bridges, carparks, mining and industrial projects.',
    href: '#services',
    image: '/images/concrete.jpg',
  },
  {
    id: 'scaffold',
    title: 'Scaffold',
    summary:
      'Scaffold and access solutions delivered with the management support to complete large-scale programmes Australia-wide.',
    href: '#services',
    image: '/images/scaffold.jpg',
  },
] as const;

export const hireSystems = [
  {
    title: 'Kwikstage',
    summary: 'Modular scaffold systems for hire across commercial and industrial sites.',
  },
  {
    title: 'PERI UP Rosett',
    summary: 'Versatile modular scaffolding engineered for complex access requirements.',
  },
  {
    title: 'Powershore 30',
    summary: 'Heavy-duty high-load shoring with up to 300kN leg capacity for demanding applications.',
  },
] as const;

export const featuredProject = {
  title: 'R1 Tower, One Sydney Harbour',
  location: 'Barangaroo, Sydney',
  summary:
    'Part of the One Sydney Harbour masterplan - a cluster of three towers with staggered heights of 250m, 210m and 107m.',
  image: '/images/project-harbour.jpg',
  href: '#projects',
} as const;

export const projects = [
  {
    title: 'Western Sydney Stadium',
    category: 'Stadium',
    image: '/images/hero-construction.jpg',
  },
  {
    title: '6 & 8 Parramatta Square',
    category: 'Commercial',
    image: '/images/project-tower.jpg',
  },
  {
    title: 'Sydney Football Stadium',
    category: 'Stadium',
    image: '/images/project-stadium.jpg',
  },
  {
    title: 'Concord Hospital Redevelopment',
    category: 'Health',
    image: '/images/project-hospital.jpg',
  },
  {
    title: 'Crown Hotel Resort Sydney',
    category: 'Hospitality',
    image: '/images/project-crown.jpg',
  },
  {
    title: 'M4 WestConnex - PRVF',
    category: 'Infrastructure',
    image: '/images/project-infra.jpg',
  },
] as const;

export const sectors = [
  {
    title: 'Commercial',
    label: 'Tier one commercial structures and precincts',
    icon: 'highrise' as const,
  },
  {
    title: 'Residential',
    label: 'Major residential towers and mixed-use developments',
    icon: 'residential' as const,
  },
  {
    title: 'Infrastructure',
    label: 'Roads, stadiums, civil and transport packages',
    icon: 'infra' as const,
  },
  {
    title: 'Safety & quality',
    label: 'Strong focus across every site and programme',
    icon: 'safety' as const,
  },
];
