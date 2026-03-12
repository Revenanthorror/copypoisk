import { configureStore } from '@reduxjs/toolkit';
import likedMoviesReducer from '@/features/favorites/model/slice';

export const store = configureStore({
  reducer: {
    likedMovies: likedMoviesReducer,
  },
  preloadedState: {
    likedMovies: JSON.parse(localStorage.getItem('likedMovies')) || [],
  },
});

store.subscribe(() => {
  localStorage.setItem('likedMovies', JSON.stringify(store.getState().likedMovies));
});