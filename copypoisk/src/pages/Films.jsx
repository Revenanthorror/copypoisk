import { useState, useEffect } from 'react';
import FilmTile from '@/entities/Movie/ui/FilmTile';
import { fetchFilmsList } from '@/entities/Movie/model/api/filmApi';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function FilmsPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        console.log('Запрос всех фильмов...');
        const list = await fetchFilmsList({ order: 'RATING', type: 'FILM' });
        console.log('Получено фильмов:', list.length);
        setMovies(list);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <CircularProgress />
        <Typography mt={2}>Загрузка фильмов...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Фильмы (по рейтингу)</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {movies.length > 0 ? (
          movies.map((film) => (
            <FilmTile key={film.kinopoiskId} film={film} />
          ))
        ) : (
          <Typography align="center" color="text.secondary">
            Фильмы не найдены.
          </Typography>
        )}
      </Box>
    </Box>
  );
}