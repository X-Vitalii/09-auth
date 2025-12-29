import type { User } from '@/types/user';
import { nextServer } from './proxy';
import type { Note, AddNote } from '../../types/note';

export type Tag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

// for function used in client-components:

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
  const { data } = await nextServer.get<NotesResponse>('/notes', {
    params: { page, perPage: 12, search: query, tag },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(newNote: AddNote): Promise<Note> {
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(deleteId: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${deleteId}`);
  return data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export async function register(data: RegisterRequest) {
  const resRegister = await nextServer.post<User>(`/auth/register`, data);
  return resRegister.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(data: LoginRequest) {
  const resLogin = await nextServer.post<User>('/auth/login', data);
  return resLogin.data;
}

export type SessionResponse = {
  message: string;
};

export async function checkSession() {
  const res = await nextServer.get<SessionResponse>('/auth/session');
  return res.data;
}

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export async function logout(): Promise<void> {
  const res = await nextServer.post('/auth/logout');
  return res.data;
}

export type UpdateUserProfile = {
  username?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserProfile) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

// fetchNotes
// fetchNoteById
// createNote
// deleteNote
// register
// login
// logout
// checkSession
// getMe
// updateMe
