'use client';

import { useEffect, type ReactNode } from 'react';

export default function V2HtmlClass({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('bkh-v2');
    return () => {
      document.documentElement.classList.remove('bkh-v2');
    };
  }, []);

  return children;
}
