import VexaMark from './VexaMark';

/**
 * VexaOs logo lockup: the official orbital mark plus the wordmark.
 * The wordmark is always written "VexaOs", with a lowercase s.
 */
export default function VexaLogo({
  size = 30,
  tone = 'dark',
  className = '',
}: {
  size?: number;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <VexaMark size={Math.round(size * 1.3)} simple title="" />
      <span
        className={`font-bold tracking-tight ${tone === 'dark' ? 'text-slate-900' : 'text-white'}`}
        style={{ fontSize: size * 0.72 }}
      >
        Vexa<span className={tone === 'dark' ? 'text-blue-600' : 'text-sky-300'}>Os</span>
      </span>
    </span>
  );
}
