'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { trackEvent, type EventProps, type MarketingEvent } from '@/lib/analytics';

/** A next/link that reports a conversion event on click. */
export default function TrackedLink({
  event,
  eventProps,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { event: MarketingEvent; eventProps?: EventProps }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
