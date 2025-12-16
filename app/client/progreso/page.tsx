import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export default async function ProgresoPage() {
  const session = await auth();
  const measurements = await prisma.measurement.findMany({
    where: { userId: Number(session?.user?.id) },
    orderBy: { recordedAt: 'desc' },
  });
  const photos = await prisma.progressPhoto.findMany({
    where: { userId: Number(session?.user?.id) },
    orderBy: { capturedAt: 'desc' },
  });

  return (
    <div className="space-y-4 pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Progreso</h1>
        <p className="text-sm text-slate-300">Mediciones rápidas y fotos guardadas en S3.</p>
      </div>
      <div className="space-y-3 px-4">
        <div className="rounded-3xl bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mediciones</h2>
            <button className="rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-slate-900">Agregar</button>
          </div>
          <div className="mt-2 space-y-1 text-sm text-slate-200">
            {measurements.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-3 py-2">
                <span>{new Date(m.recordedAt).toLocaleDateString()}</span>
                <span className="font-semibold">{m.weightKg} kg</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Fotos</h2>
            <button className="rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-slate-900">Subir</button>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {photos.map((photo) => (
              <div key={photo.id} className="aspect-square overflow-hidden rounded-2xl bg-slate-800">
                <img src={photo.url} alt="progreso" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
