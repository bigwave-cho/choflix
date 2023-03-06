import { useQuery } from 'react-query';
import { getMoives, getTvs } from '../api';

export const useMultipleQueries = (type: 'movie' | 'tv') => {
  const nowPlaying = useQuery(['nowPlaying'], () => getMoives('now_playing'));
  const topRated = useQuery(['topRated'], () => getMoives('top_rated'));
  const upcoming = useQuery(['upcoming'], () => getMoives('upcoming'));

  const latestTv = useQuery(['latestTvs'], () => getTvs('latest'));
  const popularTv = useQuery(['popularTvs'], () => getTvs('popular'));
  const aringTv = useQuery(['aringTvs'], () => getTvs('airing_today'));
  const topRatedTv = useQuery(['topRatedTvs'], () => getTvs('top_rated'));

  if (type === 'movie') {
    return [nowPlaying, topRated, upcoming];
  } else {
    return [latestTv, popularTv, aringTv, topRatedTv];
  }
};
