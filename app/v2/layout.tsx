import { Stack_Sans_Notch } from 'next/font/google';
import V2HtmlClass from './V2HtmlClass';

const stackSansNotch = Stack_Sans_Notch({
  subsets: ['latin'],
  variable: '--font-v3-display',
  display: 'swap',
});

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={stackSansNotch.variable}>
      <V2HtmlClass>{children}</V2HtmlClass>
    </div>
  );
}
