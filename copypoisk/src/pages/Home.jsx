import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Copypoisk
      </Typography>
      <Typography variant="h5" gutterBottom align="center" color="text.secondary">
        Кинопоиск — по-новому
      </Typography>

      <Typography paragraph mt={3}>
        Это учебное приложение для работы с API Кинопоиска. Здесь вы можете:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="🔍 Искать фильмы по названию или ID" />
        </ListItem>
        <ListItem>
          <ListItemText primary="🎬 Просматривать список фильмов" />
        </ListItem>
        <ListItem>
          <ListItemText primary="⭐ Сохранять любимые фильмы в Избранное" />
        </ListItem>
      </List>

      <Typography mt={4} align="center" color="text.secondary">
        Начните с раздела «Фильмы» или воспользуйтесь поиском.
      </Typography>
    </Box>
  );
}