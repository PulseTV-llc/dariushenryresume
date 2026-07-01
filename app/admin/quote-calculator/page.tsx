'use client';

import AdminGuard from '@/components/admin/AdminGuard';
import QuoteCalculator from '@/components/admin/QuoteCalculator';

// Requires runtime Firebase auth — never statically generate.
export const dynamic = 'force-dynamic';

export default function QuoteCalculatorPage() {
  return (
    <AdminGuard>
      <QuoteCalculator />
    </AdminGuard>
  );
}
