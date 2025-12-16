import { prisma } from '@/lib/prisma';

export default async function RutinasPage() {
  const exercises = await prisma.exercise.findMany();
  const templates = await prisma.programTemplate.findMany({ include: { versions: true } });

  return (
    <div className="space-y-4 pb-24 pt-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Rutinas</h1>
        <p className="text-sm text-slate-300">Catálogo de ejercicios y plantillas versionadas.</p>
      </div>
      <div className="space-y-3 px-4">
        <section className="rounded-3xl bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ejercicios</h2>
            <button className="rounded-full bg-teal-500 px-3 py-1 text-xs text-slate-900">Crear</button>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="flex items-center justify-between rounded-2xl bg-slate-800/70 px-3 py-2">
                <span>{exercise.name}</span>
                <span className="text-xs text-slate-400">{exercise.muscleGroup}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Plantillas</h2>
            <button className="rounded-full bg-teal-500 px-3 py-1 text-xs text-slate-900">Nueva versión</button>
          </div>
          <div className="mt-2 space-y-2 text-sm">
            {templates.map((template) => (
              <div key={template.id} className="rounded-2xl bg-slate-800/70 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{template.name}</p>
                    <p className="text-xs text-slate-400">{template.goal}</p>
                  </div>
                  <span className="text-xs text-slate-400">{template.versions.length} versiones</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
