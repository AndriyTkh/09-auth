import axios from 'axios';
// import type { User } from '@/types/user';
export const api = axios.create({
  baseURL: `https://09-auth-psi-seven.vercel.app/api`,
  withCredentials: true,
});

// export async function checkSession(): Promise<User | null> {
//   const res = await api.get<User>('/auth/session');
//   return res.data || null;
// }

// export async function fetchCurrentUser(): Promise<User> {
//   const res = await api.get<User>('/users/me');
//   return res.data;
// }

// export async function updateUserProfile(data: Partial<User>): Promise<User> {
//   const res = await api.patch<User>('/users/me', data);
//   return res.data;
// }
