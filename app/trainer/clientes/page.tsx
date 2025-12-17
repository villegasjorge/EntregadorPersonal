import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export default async function ClientesPage() {
  const session = await auth();
  const clients = await prisma.user.findMany({ where: { trainerId: Number(session?.user?.id), role: 'CLIENT' } });

  return (
    <div className="space-y-4 pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <p className="text-sm text-slate-300">Filtra, asigna planes y envía mensajes rápidos.</p>
      </div>
      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 text-xs">
          <button className="rounded-full bg-slate-800 px-4 py-2">Todos</button>
          <button className="rounded-full bg-slate-800 px-4 py-2">Al día</button>
          <button className="rounded-full bg-slate-800 px-4 py-2">Por vencer</button>
          <button className="rounded-full bg-slate-800 px-4 py-2">Vencidos</button>
        </div>
        <div className="mt-3 space-y-3">
          {clients.map((client) => (
            <Link
              href={`/trainer/clientes/${client.id}`}
              key={client.id}
              className="flex items-center justify-between rounded-3xl bg-slate-900 p-4"
            >
              <div>
                <p className="font-semibold">{client.name}</p>
                <p className="text-xs text-slate-400">{client.email}</p>
              </div>
              <span className="rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-slate-900">Pago al día</span>
            </Link>
          ))}
          {clients.length === 0 && <p className="text-slate-400">Aún no tienes clientes asignados.</p>}
        </div>
      </div>
    </div>
  );
}
