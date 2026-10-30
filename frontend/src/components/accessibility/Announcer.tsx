import React, { useEffect, useState } from 'react';

/** Live region for screen reader announcements */
export function Announcer({ message }: { message?: string }) {
  const [internalMessage, setInternalMessage] = useState('');

  useEffect(() => {
    if (message) {
      setInternalMessage(message);
      const timer = setTimeout(() => setInternalMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      aria-label="Live announcements"
    >
      {message || internalMessage || ''}
    </div>
  );
}
