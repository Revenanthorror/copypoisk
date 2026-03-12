import { getQueryParams } from '@/shared/lib/queryBuilder';
import { API_BASE, API_KEY } from '@/shared/config/api';

export const fetchFilmById = async (id) => {
  const res = await fetch(`${API_BASE}/v2.2/films/${id}`, {
    headers: { 'X-API-KEY': API_KEY },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const fetchFilmsList = async (params = {}) => {
  const qs = getQueryParams({ ...params, page: 1 });
  const res = await fetch(`${API_BASE}/v2.2/films?${qs}`, {
    headers: { 'X-API-KEY': API_KEY },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.items || [];
};

export const searchFilms = async (keyword) => {
  if (!keyword?.trim()) return [];
  const res = await fetch(
    `${API_BASE}/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}`,
    { headers: { 'X-API-KEY': API_KEY } }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.films || [];
};