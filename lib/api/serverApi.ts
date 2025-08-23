import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';
import { FetchNotesParams } from '@/types/FetchNotesParams';

export async function getUserServer(): Promise<User> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

export async function patchUserProfileServer(data: Partial<User>): Promise<User> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.patch<User>('/users/me', data, {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: { Cookie: cookieHeader },
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res;
}
