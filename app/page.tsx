import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();
  if (!session) return redirect('/login');
  if ((session.user as any).role === 'TRAINER') return redirect('/trainer');
  return redirect('/client/hoy');
}
