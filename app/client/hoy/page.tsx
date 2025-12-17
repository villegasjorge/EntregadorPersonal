import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import Link from 'next/link';

export default async function HoyPage() {
  const session = await auth();
  const clientId = Number(session?.user?.id);
  const today = new Date();
  const sessionData = await prisma.workoutSession.findFirst({
    where: { userId: clientId, date: today },
    include: { exerciseSets: true, planVersion: true },
  });

  return (
    <div className="pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Hoy</h1>
        <p className="text-sm text-slate-300">Revisa y arranca tu sesión asignada por tu entrenadora.</p>
      </div>
      <div className="mt-4 space-y-3 px-4">
        <div className="rounded-3xl bg-slate-900 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Sesión</p>
              <h2 className="text-xl font-semibold">{sessionData?.planVersion?.name ?? 'Sesión guiada'}</h2>
            </div>
            <span className="rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-slate-900">{today.toLocaleDateString()}</span>
          </div>
          <Link
            href="/client/hoy/iniciar"
            className="mt-4 block rounded-2xl bg-teal-500 p-4 text-center text-lg font-bold text-slate-900"
          >
            Iniciar entrenamiento
          </Link>
        </div>
      </div>
    </div>
  );
}
