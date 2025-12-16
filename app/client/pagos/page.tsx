import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export default async function PagosPage() {
  const session = await auth();
  const invoices = await prisma.invoice.findMany({
    where: { userId: Number(session?.user?.id) },
    include: { payments: true },
    orderBy: { dueDate: 'desc' },
  });

  const status = invoices[0]?.status ?? 'up_to_date';
  const statusLabel = {
    up_to_date: 'Al día',
    due_soon: 'Por vencer',
    overdue: 'Vencido',
  } as Record<string, string>;

  return (
    <div className="space-y-4 pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Pagos</h1>
        <p className="text-sm text-slate-300">Consulta tu suscripción y facturas.</p>
      </div>
      <div className="space-y-3 px-4">
        <div className="rounded-3xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Estado</p>
          <p className="text-2xl font-semibold">{statusLabel[status]}</p>
          <button className="mt-3 w-full rounded-2xl bg-teal-500 p-3 text-slate-900">Registrar pago</button>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Historial</h2>
          <div className="mt-2 space-y-2 text-sm">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-3 py-2">
                <div>
                  <p className="font-semibold">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-400">Factura #{invoice.id}</p>
                </div>
                <span className="text-emerald-400">{invoice.amount / 100} USD</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
