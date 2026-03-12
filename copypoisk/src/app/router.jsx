import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/app/layout/AppLayout';
import HomePage from '@/pages/Home';
import FilmsPage from '@/pages/Films';
import SearchPage from '@/pages/Search';
import FilmDetail from '@/pages/FilmDetail';
import FavoritesPage from '@/pages/Favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'films', element: <FilmsPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'film/:id', element: <FilmDetail /> },
      { path: 'favorites', element: <FavoritesPage /> },
    ],
  },
]);