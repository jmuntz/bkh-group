'use client';

import DesignNotes from './DesignNotes';
import ColorSchemeToggle from './ColorSchemeToggle';

export default function PreviewToolbar() {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 sm:bottom-6 sm:right-6">
      <DesignNotes />
      <ColorSchemeToggle embedded />
    </div>
  );
}
