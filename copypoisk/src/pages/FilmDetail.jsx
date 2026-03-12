import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilmById } from '@/entities/Movie/model/api/filmApi';
import { toggleLikedMovie } from '@/features/favorites/model/slice';
import { Rating } from '@mui/material';
import { Box, Typography, Button, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { checkPoster } from '@/entities/Movie/model/utils/posterUtils';

export default function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLiked = useSelector((state) =>
    state.likedMovies.some((m) => m.id === Number(id))
  );

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFilmById(id);
        setFilm(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography>Загрузка информации о фильме...</Typography>
      </Box>
    );
  }

  if (!film) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography color="error">Фильм не найден</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Назад</Button>
      </Box>
    );
  }

  const handleToggleLike = () => {
    dispatch(
      toggleLikedMovie({
        id: film.kinopoiskId,
        name: film.nameRu || film.nameOriginal || 'Неизвестный фильм',
        poster: film.posterUrl || film.posterUrlPreview || '',
        year: film.year || '—',
        rating: film.ratingKinopoisk || 0,
      })
    );
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1000, margin: '0 auto' }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>← Назад</Button>

      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          image={checkPoster(film.posterUrl)}
          alt={film.nameRu}
          sx={{ width: { md: 300 }, height: { md: 450 }, objectFit: 'cover' }}
        />
        <CardContent sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {film.nameRu} ({film.year})
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={film.ratingKinopoisk} precision={0.5} readOnly max={10} />
            <Typography sx={{ ml: 1, color: 'text.secondary' }}>
              {film.ratingKinopoisk || '—'}/10
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>Описание</Typography>
          <Typography paragraph>
            {film.description || 'Описание отсутствует.'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              color="primary"
              href={film.webUrl}
              target="_blank"
              rel="noopener"
            >
              Перейти на Кинопоиск
            </Button>
            <Button
              variant={isLiked ? 'outlined' : 'contained'}
              color={isLiked ? 'error' : 'success'}
              onClick={handleToggleLike}
            >
              {isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}