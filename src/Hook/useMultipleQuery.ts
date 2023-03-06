import { useQuery } from 'react-query';
import { getMoives } from '../api';

export const useMultipleQueries = (type: 'movie' | 'tv') => {
  const nowPlaying = useQuery(['nowPlaying'], () => getMoives('now_playing'));
  const topRated = useQuery(['topRated'], () => getMoives('top_rated'));
  const upcoming = useQuery(['upcoming'], () => getMoives('upcoming'));
  if (type === 'movie') {
    return [nowPlaying, topRated, upcoming];
  }
  return [];
};
