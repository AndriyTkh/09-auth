import { cookies } from 'next/headers';
import { api } from './api';

export async function checkServerSession() {
  const res = await api.get('/auth/session');
  return res;
}
export async function fetchNoteById(id: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      ...{ Cookie: cookieHeader }, 
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch note details');
  }

  const parsedRes = await res.json();

  console.log(parsedRes.data);
  

  return parsedRes.data;
}