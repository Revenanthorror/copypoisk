import { useState, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { searchFilms } from '@/entities/Movie/model/api/filmApi';
import FilmTile from '@/entities/Movie/ui/FilmTile';
import { TextField, Box, Typography, CircularProgress } from '@mui/material';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      try {
        const films = await searchFilms(debouncedQuery);
        setResults(films);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [debouncedQuery]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Поиск фильмов</Typography>
      <TextField
        fullWidth
        placeholder="Введите название или ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      {loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && results.length === 0 && query && (
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
          Ничего не найдено по запросу "{query}"
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {results.map((film) => (
          <FilmTile key={film.filmId} film={film} />
        ))}
      </Box>
    </Box>
  );
}