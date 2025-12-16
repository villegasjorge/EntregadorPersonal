'use client';

import { useState } from 'react';

const exercises = [
  { id: 1, name: 'Sentadilla', sets: 3 },
  { id: 2, name: 'Press banca', sets: 3 },
  { id: 3, name: 'Remo', sets: 3 },
];

export default function IniciarEntrenamiento() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="pb-24 pt-4">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Sesión de hoy</h1>
        <p className="text-sm text-slate-300">Registra tus sets rápido y marca completado.</p>
      </div>
      <div className="mt-4 space-y-3 px-4">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="rounded-3xl bg-slate-900 p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{exercise.name}</p>
                <p className="text-xs text-slate-400">{exercise.sets} sets</p>
              </div>
              <button className="rounded-2xl bg-slate-800 px-3 py-2 text-xs text-teal-300">Agregar set</button>
            </div>
            {[...Array(exercise.sets)].map((_, idx) => (
              <div key={idx} className="mt-2 grid grid-cols-4 gap-2 text-xs">
                <input className="rounded-xl bg-slate-800 p-2" placeholder="Reps" />
                <input className="rounded-xl bg-slate-800 p-2" placeholder="Peso" />
                <input className="rounded-xl bg-slate-800 p-2" placeholder="RPE" />
                <input className="rounded-xl bg-slate-800 p-2" placeholder="Dolor" />
              </div>
            ))}
          </div>
        ))}
        <textarea className="w-full rounded-3xl bg-slate-900 p-4 text-sm" placeholder="Notas rápidas" />
        <button
          className={`w-full rounded-3xl p-4 text-lg font-bold ${
            completed ? 'bg-emerald-500 text-slate-900' : 'bg-teal-500 text-slate-900'
          }`}
          onClick={() => setCompleted(true)}
        >
          {completed ? 'Sesión completada' : 'Marcar completada'}
        </button>
      </div>
    </div>
  );
}
