export {
  site,
  navLinks,
  services,
  hireSystems,
  featuredProject,
} from '../site-v2';

/** Portfolio-led work types for the About stack mockup. */
export const workShowcase = [
  {
    id: 'stadiums',
    title: 'Stadiums',
    project: 'Sydney Football Stadium',
    summary: 'Major sporting venues delivered with structural packages built for scale and programme certainty.',
    image: '/images/project-stadium.jpg',
  },
  {
    id: 'residential',
    title: 'Apartment complexes',
    project: 'Greenland Centre, Sydney',
    summary: 'High-rise residential structures where formwork, concrete and access move as one package.',
    image: '/images/project-tower.jpg',
  },
  {
    id: 'commercial',
    title: 'Commercial buildings',
    project: 'Crown Hotel Resort Sydney',
    summary: 'Tier one commercial and hospitality precincts across NSW’s most demanding environments.',
    image: '/images/project-crown.jpg',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    project: 'M4 WestConnex - PRVF',
    summary: 'Civil and transport packages where safety, quality and in-house capability keep works moving.',
    image: '/images/project-infra.jpg',
  },
] as const;

/** Projects carousel only - must not repeat About workShowcase projects or images */
export const projects = [
  {
    title: 'Western Sydney Stadium',
    category: 'Stadium',
    image: '/images/hero-construction.jpg',
  },
  {
    title: '6 & 8 Parramatta Square',
    category: 'Commercial',
    image: '/images/hire-systems.jpg',
  },
  {
    title: 'Concord Hospital Redevelopment',
    category: 'Health',
    image: '/images/project-hospital.jpg',
  },
  {
    title: 'Pacific Highway Upgrade',
    category: 'Infrastructure',
    image: '/images/concrete.jpg',
  },
  {
    title: 'Barangaroo South Precinct',
    category: 'Commercial',
    image: '/images/formwork.jpg',
  },
  {
    title: 'Newcastle Courthouse',
    category: 'Civic',
    image: '/images/scaffold.jpg',
  },
] as const;
