import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ClientDetail({ params }: { params: { id: string } }) {
  const client = await prisma.user.findUnique({
    where: { id: Number(params.id) },
    include: {
      measurements: true,
      invoices: true,
      attendance: true,
      subscriptions: { include: { plan: true } },
    },
  });
  if (!client) return notFound();

  return (
    <div className="space-y-4 pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <p className="text-sm text-slate-300">Acciones rápidas: pago, asistencia, plan, mensaje.</p>
      </div>
      <div className="space-y-3 px-4">
        <div className="rounded-3xl bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Suscripción</h2>
          {client.subscriptions.map((sub) => (
            <div key={sub.id} className="mt-2 rounded-2xl bg-slate-800/70 p-3 text-sm">
              <p className="font-semibold">{sub.plan?.name}</p>
              <p className="text-xs text-slate-400">Renueva {new Date(sub.startDate).toLocaleDateString()}</p>
            </div>
          ))}
          <button className="mt-3 w-full rounded-2xl bg-teal-500 p-3 text-slate-900">Asignar plan</button>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Pagos</h2>
          <div className="space-y-2 text-sm">
            {client.invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-2xl bg-slate-800/70 px-3 py-2">
                <div>
                  <p className="font-semibold">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-400">Factura #{invoice.id}</p>
                </div>
                <button className="rounded-full bg-amber-400 px-3 py-1 text-xs text-slate-900">Registrar pago</button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Asistencia</h2>
          <div className="flex gap-2 text-xs">
            <button className="flex-1 rounded-2xl bg-emerald-500 px-3 py-2 text-slate-900">Presente</button>
            <button className="flex-1 rounded-2xl bg-amber-400 px-3 py-2 text-slate-900">Tarde</button>
            <button className="flex-1 rounded-2xl bg-rose-500 px-3 py-2 text-slate-900">Ausente</button>
          </div>
          <div className="mt-3 space-y-1 text-sm">
            {client.attendance.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl bg-slate-800/70 px-3 py-2">
                <span>{new Date(a.date).toLocaleDateString()}</span>
                <span className="text-xs text-slate-300">{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
