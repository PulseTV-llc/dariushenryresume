'use client';

import { icons, LucideProps } from 'lucide-react';

/**
 * Renders a lucide icon by its string name (data files reference icons by name).
 * Falls back to a neutral square if the name is unknown.
 */
export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[name] ?? icons.Square;
  return <Cmp {...props} />;
}
