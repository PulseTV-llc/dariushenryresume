import {
  Smartphone,
  DoorOpen,
  ChefHat,
  LayoutDashboard,
  LineChart,
  CalendarClock,
  Cpu,
  ArrowRight,
} from 'lucide-react';

/**
 * The Restaurant OS ecosystem at a glance — so a visitor sees the connected system in one look
 * instead of reading through every module. Order mirrors how a service actually flows, ending
 * with IoT held deliberately secondary (platform/roadmap, not "every integration is finished").
 */
const NODES = [
  { icon: Smartphone, label: 'Server / Waiter', detail: 'Orders, modifiers, splits & pay at the table' },
  { icon: DoorOpen, label: 'Host', detail: 'Waitlist, reservations & floor pacing' },
  { icon: ChefHat, label: 'Kitchen (KDS)', detail: 'Tickets by station, bump-to-served' },
  { icon: LayoutDashboard, label: 'Management', detail: 'Floor, approvals, purchasing & daily close' },
  { icon: LineChart, label: 'Finance', detail: 'Sales, food & labor cost, multi-location P&L' },
  { icon: CalendarClock, label: 'Scheduling', detail: 'Shifts, clock-in, labor cost & tips' },
] as const;

export default function RestaurantEcosystem() {
  return (
    <div>
      <div className="flex flex-wrap items-stretch justify-center gap-2.5">
        {NODES.map((n, i) => (
          <div key={n.label} className="flex items-stretch gap-2.5">
            <div className="w-[168px] rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <n.icon className="w-5 h-5 text-sky-300" />
              <p className="mt-3 text-sm font-semibold text-white leading-snug">{n.label}</p>
              <p className="mt-1 text-[12.5px] text-gray-500 leading-relaxed">{n.detail}</p>
            </div>
            {i < NODES.length - 1 && (
              <div className="hidden lg:flex items-center" aria-hidden="true">
                <ArrowRight className="w-4 h-4 text-sky-500/50" />
              </div>
            )}
          </div>
        ))}

        {/* IoT — deliberately secondary: on the platform/roadmap, not implied finished. */}
        <div className="flex items-stretch gap-2.5">
          <div className="hidden lg:flex items-center" aria-hidden="true">
            <ArrowRight className="w-4 h-4 text-sky-500/30" />
          </div>
          <div className="w-[168px] rounded-2xl border border-dashed border-white/15 bg-transparent p-4">
            <Cpu className="w-5 h-5 text-gray-400" />
            <p className="mt-3 text-sm font-semibold text-gray-300 leading-snug">IoT & Sensors</p>
            <p className="mt-1 text-[12.5px] text-gray-500 leading-relaxed">
              Temp, BLE/NFC & equipment monitoring — on the platform roadmap
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        One system. One data layer. Every app above shares the same customers, staff, menu, and
        numbers — nothing to reconcile between vendors.
      </p>
    </div>
  );
}
