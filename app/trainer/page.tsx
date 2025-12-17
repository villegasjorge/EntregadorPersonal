import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export default async function TrainerDashboard() {
  const session = await auth();
  const trainerId = Number(session?.user?.id);
  const today = new Date();
  const agenda = await prisma.workoutSession.findMany({
    where: { trainerId, date: today },
    include: { user: true },
  });
  const invoices = await prisma.invoice.findMany({ where: { status: { in: ['overdue', 'due_soon'] } }, include: { user: true } });
  const attendance = await prisma.attendance.findMany({
    where: { trainerId, date: today },
    include: { user: true },
  });

  return (
    <div className="space-y-4 pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-300">Resumen de agenda, pagos y alertas.</p>
      </div>
      <div className="space-y-3 px-4">
        <section className="rounded-3xl bg-slate-900 p-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Agenda de hoy</h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">{today.toLocaleDateString()}</span>
          </header>
          <div className="mt-2 space-y-2 text-sm">
            {agenda.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-800/70 px-3 py-2">
                <span>{item.user?.name}</span>
                <button className="rounded-full bg-teal-500 px-3 py-1 text-xs text-slate-900">Abrir</button>
              </div>
            ))}
            {agenda.length === 0 && <p className="text-slate-400">No hay sesiones agendadas.</p>}
          </div>
        </section>
        <section className="rounded-3xl bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Pagos por vencer</h2>
          <div className="mt-2 space-y-2 text-sm">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-2xl bg-slate-800/70 px-3 py-2">
                <div>
                  <p className="font-semibold">{invoice.user?.name}</p>
                  <p className="text-xs text-slate-400">Vence {new Date(invoice.dueDate).toLocaleDateString()}</p>
                </div>
                <button className="rounded-full bg-amber-400 px-3 py-1 text-xs text-slate-900">Registrar pago</button>
              </div>
            ))}
            {invoices.length === 0 && <p className="text-slate-400">Sin alertas de pago.</p>}
          </div>
        </section>
        <section className="rounded-3xl bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Asistencias</h2>
          <div className="mt-2 space-y-2 text-sm">
            {attendance.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-2xl bg-slate-800/70 px-3 py-2">
                <span>{a.user?.name}</span>
                <span className="text-xs text-slate-300">{a.status}</span>
              </div>
            ))}
            {attendance.length === 0 && <p className="text-slate-400">Registra asistencias desde clientes.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
