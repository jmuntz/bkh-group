import StatementSection from './StatementSection';
import { site } from '@/lib/site-v2';

export function StatementAnniversary() {
  return (
    <StatementSection
      headline={
        <>
          {site.anniversaryYears} years
          <br />
          in business
        </>
      }
      subline="Headquarters in NSW and QLD, delivering on major commercial, residential and infrastructure programmes Australia-wide."
    />
  );
}

export function StatementPackages() {
  return (
    <StatementSection
      headline={
        <>
          Design
          <br />
          to delivery
        </>
      }
      subline="Structural packages managed end to end - system design, formwork, concrete placement and scaffolding from a single point of contact."
    />
  );
}
