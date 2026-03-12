import { FilmTile } from '@/entities/Movie/ui/FilmTile';
import { MemoryRouter } from 'react-router-dom';

const mockFilm = {
  kinopoiskId: 5003510,
  nameRu: 'F1',
  year: 2025,
  posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/5003510.jpg',
  ratingKinopoisk: 8.5,
};

export default {
  title: 'Entities/Movie/FilmTile',
  component: FilmTile,
  decorators: [(Story) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  )],
  args: {
    film: mockFilm,
  },
};

export const Default = {
  args: {},
};

export const Liked = {
  args: {
    film: { ...mockFilm, ratingKinopoisk: 9.2 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Фильм в избранном',
      },
    },
  },
};