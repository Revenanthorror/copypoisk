import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { toggleLikedMovie } from '@/features/favorites/model/slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkPoster } from '@/entities/Movie/model/utils/posterUtils';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: '0 px 12px rgba(0,0,0,0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
  },
}));

const Poster = styled(CardMedia)({
  height: 300,
  objectFit: 'cover',
});

const Info = styled(CardContent)({
  padding: '16px 12px',
});

const Year = styled(Typography)({
  color: '#7f8c8d',
  fontSize: '0.9rem',
});

export default function FilmTile({ film }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLiked = useSelector((state) =>
    state.likedMovies.some((m) => m.id === film.kinopoiskId)
  );

  const handleToggleLike = () => {
    dispatch(
      toggleLikedMovie({
        id: film.kinopoiskId,
        name: film.nameRu,
        poster: film.posterUrl,
        year: film.year,
      })
    );
  };

  return (
    <StyledCard onClick={() => navigate(`/film/${film.kinopoiskId}`)}>
      <Poster
        component="img"
        image={checkPoster(film.posterUrl || film.posterUrlPreview)}
        alt={film.nameRu}
      />
      <Info>
        <Typography variant="subtitle1" fontWeight="600" noWrap>
          {film.nameRu}
        </Typography>
        <Year>{film.year}</Year>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {film.ratingKinopoisk ? `${film.ratingKinopoisk}/10` : '—'}
          </Typography>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleLike();
            }}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: isLiked ? '#e74c3c' : '#95a5a6',
            }}
          >
            ❤️ {isLiked ? 'В избранном' : 'Добавить'}
          </button>
        </div>
      </Info>
    </StyledCard>
  );
}