import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';

export default function TopBar() {
  const likedCount = useSelector((state) => state.likedMovies.length);

  return (
    <AppBar position="static" sx={{ bgcolor: '#1a1d23' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MovieIcon fontSize="small" sx={{ color: '#87ceeb' }} />
          Copypoisk
        </Typography>

        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <HomeIcon fontSize="small" />
          <span>Домой</span>
        </Link>

        <Link to="/films" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <MovieIcon fontSize="small" />
          <span>Фильмы</span>
        </Link>

        <Link to="/search" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SearchIcon fontSize="small" />
          <span>Поиск</span>
        </Link>

        <Badge
          badgeContent={likedCount}
          color="primary"
          overlap="circular"
          sx={{ ml: 'auto' }}
        >
          <Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <FavoriteIcon fontSize="small" />
          </Link>
        </Badge>
      </Toolbar>
    </AppBar>
  );
}