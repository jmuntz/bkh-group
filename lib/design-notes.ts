export type DesignNotesVariant = 'v1' | 'v2' | 'v3';

export const VERSION_CATALOG: Record<
  DesignNotesVariant,
  {
    id: DesignNotesVariant;
    href: string;
    name: string;
    tier: string;
    hint: string;
    summary: string;
  }
> = {
  v1: {
    id: 'v1',
    href: '/v1',
    name: 'Base',
    tier: 'Base',
    hint: 'WordPress-friendly · standard build scope',
    summary: 'Static sections, full copy, simplest long-term maintenance. Aligns with the standard WordPress build quote.',
  },
  v2: {
    id: 'v2',
    href: '/v2',
    name: 'Base+',
    tier: 'Base+',
    hint: 'Motion and full copy',
    summary: 'Video, motion scroll reveals, animated nav and carousels. Priced seperately to Base.',
  },
  v3: {
    id: 'v3',
    href: '/v3',
    name: 'Base+ Minimal',
    tier: 'Base+ Minimal',
    hint: 'Minimal Built-style copy',
    summary: 'Same Base+ build tier with a copy-light direction closer to Built.com.au.',
  },
};

export function versionName(variant: DesignNotesVariant) {
  return VERSION_CATALOG[variant].name;
}

export const PANEL_SCOPE = [
  'Look-and-feel mockup for the homepage only - not final design.',
  'Base, Base+ and Base+ Minimal are not the same build scope or price. See full notes for commercial detail.',
  'Use the switcher to compare directions and color schemes. Preview controls will not appear on the live site.',
];

export const ENGAGEMENT_NOTES = [
  'This is a look and feel mockup - not a full or final design. Layout, typography, colour and homepage rhythm are the focus. ',
  'Additional pages (services, projects, Sales & Hire, contact and project templates) will be designed to match once this direction is approved.',
  'Feedback is welcome. Further refinement is part of the design milestone that follows this pre-design alignment phase.',
  'Copy and imagery are draft assets aligned to the brief. Final content, photography and approvals happen during design and build.',
  'Preview controls on this site (version switch, colour scheme, design notes) are for presentation only and will not appear on the live site.',
  'Everything subject to change.',
];

export const BRIEF_POINTS = [
  'Position BKH as a leading vertically integrated structural construction solutions partner.',
  'Speak to tier one commercial, residential and infrastructure work.',
  'Emphasise safety, quality and long-standing experience on major construction programmes.',
  'Show strong in-house capability and Australia-wide delivery from NSW and QLD headquarters.',
  'Present services as tailored packages rather than long text blocks.',
  'Lead with projects and capabilities, bold imagery and skim-able copy.',
];

export const LIVE_SITE_NOTES = [
  'The current site at bkhgroup.com.au is service-led with deep navigation into Formwork, Concrete, Scaffold and Sales & Hire.',
  'Copy is informative but text-heavy compared to the brief direction toward imagery and skim-able sections.',
  'Project presentation is functional; the brief asks for a stronger portfolio focus similar to references like Built.',
  'Social links, contact details and tier one positioning are present but could be surfaced more confidently on the homepage.',
];

export const THEME_STYLE_POINTS = [
  'Dark base with brand purple (#5C4468) and accent yellow (#FFD300) - stakeholders did not want excessive white space.',
  'Large-format photography and video to lead each section rather than dense paragraphs.',
  'Light, confident typography with short headlines and supporting copy kept to a skim-able length.',
  'Portfolio-first layout rhythm: hero, capabilities, featured project, work types, project gallery, hire systems, contact.',
  'CTA yellow used sparingly for buttons, labels and key highlights so it stays impactful.',
  'Reference direction aligns with Built-style presentation: bold visuals, minimal clutter, strong project credibility.',
];

export const CONTENT_POINTS = [
  'Same core messaging across versions: vertically integrated partner, tier one sectors, safety and quality, in-house capability.',
  'Hero introduces the brand with a clear enquiry path and phone number visible early.',
  'Services/capabilities cover Formwork, Concrete and Scaffold as visual cards rather than long service pages on the homepage.',
  'Featured project anchors credibility with a flagship build (R1 Tower, One Sydney Harbour).',
  'About/work types explain sector experience across stadiums, residential towers, commercial and infrastructure.',
  'Projects gallery surfaces a wider cross-section of work beyond the featured project.',
];

export const COMMERCIAL_NOTES = [
  'Concepts are grouped as Base (standard WordPress scope) and Base+ (custom build with motion, video and animatedscroll behaviour). Base+ Minimal shares the Base+ build tier but has a copy-light creative direction.',
  'Base suits straightforward WordPress delivery - static sections, reusable templates and easier long-term maintenance within the quoted scope.',
  'Base+ and Base+ Minimal are a future state direction that can be quoted seperately if desired.',
  'Base+ also available as a $150/mth AUD flexiplan, all maintenance, running costs and unlimited revisions included for duration of agreement. Keeping upfront costs in pocket.',
];

export type VersionNotes = {
  title: string;
  intro: string;
  changes: string[];
  outcomes: string[];
};

export const VERSION_NOTES: Record<DesignNotesVariant, VersionNotes> = {
  v1: {
    title: 'Base',
    intro:
      'Base is the WordPress-friendly direction: same theme and content as Base+ and Base+ Minimal, with static sections and simpler interaction. This aligns with the standard build scope.',
    changes: [
      'Static hero image - no looping video.',
      'Solid navigation bar on scroll - no floating pill.',
      'Instant mobile menu toggle - no animated overlay.',
      'Static alternating about rows - no sticky scroll stack.',
      'Project grid with hover states - no autoscrolling carousel.',
      'Full body copy on service cards and section intros.',
    ],
    outcomes: [
      'Easier to build and maintain in WordPress.',
      'Lower ongoing complexity for content updates.',
      'Same brand direction without custom motion dependencies.',
    ],
  },
  v2: {
    title: 'Base+',
    intro:
      'Base+ uses the same theme, content and section structure as Base. The enhancements below are interaction and presentation upgrades on a custom build tier.',
    changes: [
      'Looping hero video and scroll-triggered section reveals add energy without changing the copy.',
      'Floating navigation pill on scroll replaces the solid bar for a premium feel.',
      'Mobile menu uses animated open/close, a smooth full-screen overlay and staggered link reveals - Base keeps instant toggling for simpler WordPress delivery.',
      'About/work types use a sticky viewport with choreographed image and copy paths instead of static alternating rows.',
      'Projects run as an autoscrolling carousel with hover pause rather than a static grid.',
      'Service cards include richer hover motion and layered imagery.',
    ],
    outcomes: [
      'Motion, transitions and scroll rhythm create a more refined experience that strengthens first impression and credibility with tier one clients - without adding more copy.',
      'Clearer differentiation from the current live site while keeping the same content and brand system.',
    ],
  },
  v3: {
    title: 'Base+ Minimal',
    intro:
      'Base+ Minimal keeps the Base+ motion system and section order, then trims body copy and leads with large bold headings - closer to the Built.com.au reference the brief pointed to, but with enough clarity on what BKH does to avoid Built\'s "who are we?" problem.',
    changes: [
      'Copy follows a Built-style minimal voice: short stacked phrases and large display headings, with almost no body copy.',
      'Hero uses the existing brand tagline - not a service list or generic positioning line.',
      'Stack Sans Notch font on display headings for a bit of brand schmick (Syne font retained for the hero h1 only - it\'s too wide to use for all content).',
      'Mild parallax on bold headings offsets their movement against the rest of the page as you scroll.',
      'Same custom motion foundation as Base+ (video, reveals, carousel, about stack) with a quieter, minimal vibe.',
    ],
    outcomes: [
      'Built-style visual confidence without Built\'s vague copy or credibility gaps from over-stripping context.',
      'Faster skim for tier one stakeholders who already know the sector language.',
      'Clear choice against Base+ if the preference is quieter body copy and stronger headline presence.',
    ],
  },
};

export const VERSION_COMPARISON = (
  Object.keys(VERSION_CATALOG) as DesignNotesVariant[]
).map((version) => {
  const item = VERSION_CATALOG[version];
  return {
    version,
    name: item.name,
    tier: item.tier,
    label: item.hint.split(' · ')[0] ?? item.hint,
    summary: item.summary,
    href: item.href,
  };
});

export const THEME_STYLE_INTRO =
  'All concepts share the same visual direction. Base+ and Base+ Minimal add motion; Base+ Minimal also trims copy and pushes larger display headings closer to a Built-style read.';
