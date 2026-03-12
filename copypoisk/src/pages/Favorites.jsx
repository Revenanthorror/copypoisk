import { useSelector } from 'react-redux';
import FilmTile from '@/entities/Movie/ui/FilmTile';
import { Box, Typography, Grid } from '@mui/material';

export default function FavoritesPage() {
  const likedMovies = useSelector((state) => state.likedMovies);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Избранное ({likedMovies.length})
      </Typography>

      {likedMovies.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ py: 8 }}>
          Вы ещё ничего не добавили в избранное.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {likedMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <FilmTile film={{
                kinopoiskId: movie.id,
                nameRu: movie.name,
                posterUrl: movie.poster,
                year: movie.year,
                ratingKinopoisk: movie.rating,
              }} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}