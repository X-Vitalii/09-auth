import { cookies } from 'next/headers';
// import { nextServer } from './api';
import { User } from '@/types/user';
import type { Note, Tag } from '../../types/note';
import { api } from '@/app/api/api';

// for function called in server components (have to add cookies to params in headers):

// fetchNotes
// fetchNoteById

// getMe
// checkSession.

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
interface FetchNotesParams {
  query?: string;
  page: number;
  tag?: Tag;
}
export async function fetchNotes({
  query,
  page,
  tag,
}: FetchNotesParams): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>('/notes', {
    params: { page, perPage: 12, search: query, tag },
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export const checkServerSession = async () => {
  // get current actual cookies
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      // Pass cookies forward
      Cookie: cookieStore.toString(),
    },
  });
  // Return full response to middleware to have access to new cookies
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
