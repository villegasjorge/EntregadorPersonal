import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export default async function MensajesPage() {
  const session = await auth();
  const messages = await prisma.message.findMany({
    where: { userId: Number(session?.user?.id) },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-4 pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Mensajes</h1>
        <p className="text-sm text-slate-300">Chat directo con tu entrenadora, admite adjuntos S3.</p>
      </div>
      <div className="space-y-3 px-4">
        <div className="space-y-2 rounded-3xl bg-slate-900 p-4">
          {messages.map((message) => (
            <div key={message.id} className="rounded-2xl bg-slate-800/70 p-3 text-sm">
              <p className="text-xs text-slate-400">{new Date(message.createdAt).toLocaleString()}</p>
              <p>{message.content}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-sm text-slate-400">Aún no hay mensajes.</p>}
        </div>
        <button className="w-full rounded-3xl bg-teal-500 p-4 text-slate-900">Enviar mensaje rápido</button>
      </div>
    </div>
  );
}
