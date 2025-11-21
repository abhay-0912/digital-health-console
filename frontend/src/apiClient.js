import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const publicClient = axios.create({ baseURL: API_BASE });

export function authClient() {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: API_BASE,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}
