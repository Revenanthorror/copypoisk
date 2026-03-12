import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('likedMovies')) || [];

const likedMoviesSlice = createSlice({
  name: 'likedMovies',
  initialState,
  reducers: {
    addLikedMovie: (state, action) => {
      if (!state.some((m) => m.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeLikedMovie: (state, action) => {
      return state.filter((m) => m.id !== action.payload);
    },
    toggleLikedMovie: (state, action) => {
      const idx = state.findIndex((m) => m.id === action.payload.id);
      if (idx === -1) {
        state.push(action.payload);
      } else {
        state.splice(idx, 1);
      }
    },
  },
});

export const { addLikedMovie, removeLikedMovie, toggleLikedMovie } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;