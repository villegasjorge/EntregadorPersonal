import { prisma } from '@/lib/prisma';

export default async function MensajesTrainerPage() {
  const threads = await prisma.message.groupBy({ by: ['userId'], _count: true });

  return (
    <div className="space-y-4 pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Mensajes</h1>
        <p className="text-sm text-slate-300">Responde a clientes y envía adjuntos.</p>
      </div>
      <div className="px-4 space-y-3">
        {threads.map((thread) => (
          <div key={thread.userId} className="flex items-center justify-between rounded-3xl bg-slate-900 p-4">
            <div>
              <p className="font-semibold">Cliente #{thread.userId}</p>
              <p className="text-xs text-slate-400">{thread._count} mensajes</p>
            </div>
            <button className="rounded-full bg-teal-500 px-3 py-1 text-xs text-slate-900">Abrir chat</button>
          </div>
        ))}
        {threads.length === 0 && <p className="text-slate-400">No hay mensajes aún.</p>}
      </div>
    </div>
  );
}
