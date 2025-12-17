'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) {
      setError('Credenciales inválidas');
    } else {
      router.push('/client/hoy');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl bg-slate-900 p-6 shadow-xl">
        <h1 className="mb-4 text-center text-2xl font-bold text-white">Entrenadora Personal</h1>
        <label className="text-sm text-slate-200">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-2xl border border-slate-700 bg-slate-800 p-3 text-white"
          placeholder="tu@email.com"
        />
        <label className="text-sm text-slate-200">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full rounded-2xl border border-slate-700 bg-slate-800 p-3 text-white"
          placeholder="••••••"
        />
        {error && <p className="mb-2 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="mt-2 w-full rounded-2xl bg-teal-500 py-3 text-lg font-semibold text-slate-900"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
