export const site = {
  name: 'BKH Group',
  tagline: 'Setting the Future in Concrete',
  phone: '(02) 9671 8700',
  phoneHref: 'tel:+61296718700',
  email: 'enquiries@bkhgroup.com.au',
  address: '378 Vardys Rd, Kings Park NSW 2148',
  founded: 1996,
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
      'Many years of experience across a wide range of applications, backed by a large stock of shoring systems that can be readily applied to any project.',
    href: '#services',
    image: '/images/formwork.jpg',
  },
  {
    id: 'concrete',
    title: 'Concrete',
    summary:
      'Complete concrete placement for high rise, retail, schools, hospitals, bridges, carparks, mining and industrial projects throughout NSW.',
    href: '#services',
    image: '/images/concrete.jpg',
  },
  {
    id: 'scaffold',
    title: 'Scaffold',
    summary:
      'Scaffold and access solutions across Sydney and regional NSW, with the management support to complete large-scale projects.',
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

export const stats = [
  { value: 'High rise', label: 'Towers and commercial structures' },
  { value: 'Health', label: 'Hospital and precinct works' },
  { value: 'Stadiums', label: 'Major sporting venues' },
  { value: 'Infrastructure', label: 'Roads, interchanges and civil packages' },
] as const;
