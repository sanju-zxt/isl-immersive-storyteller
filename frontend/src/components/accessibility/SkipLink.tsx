import React from 'react';

/** Skip-to-content link for keyboard navigation (WCAG 2.1 AA) */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}
