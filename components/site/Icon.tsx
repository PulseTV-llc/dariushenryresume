import { icons, type LucideProps } from 'lucide-react';

/**
 * Renders a lucide icon by its string name (data files reference icons by name).
 * Falls back to a neutral square if the name is unknown.
 *
 * Deliberately a SERVER component: the name → icon map covers the whole lucide
 * set, so rendering on the server ships only the SVGs actually used. Do not
 * import this from a 'use client' file — import the specific icon instead.
 */
export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[name] ?? icons.Square;
  return <Cmp {...props} />;
}
