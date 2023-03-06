import { AnimatePresence } from 'framer-motion';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { IData } from '../api';
import Banner from '../Components/Banner';
import Modal from '../Components/Modal';
import Slider from '../Components/Slider';
import { useMultipleQueries } from '../Hook/useMultipleQuery';
const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const bigMovieMatch = useMatch('/choflix/movies/:movieId/:kind');

  const [nowPlaying, topRated, upcoming] = useMultipleQueries('movie');
  const clickedMovie =
    (bigMovieMatch?.params.movieId &&
      nowPlaying.data?.results.find(
        (movie: any) => movie.id + '' === bigMovieMatch.params.movieId
      )) ||
    (bigMovieMatch?.params.movieId &&
      topRated.data?.results.find(
        (movie: any) => movie.id + '' === bigMovieMatch.params.movieId
      )) ||
    (bigMovieMatch?.params.movieId &&
      upcoming.data?.results.find(
        (movie: any) => movie.id + '' === bigMovieMatch.params.movieId
      ));
  return (
    <Wrapper>
      {nowPlaying.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={nowPlaying.data?.results[0] as IData}
            detailSearchUrl="home"
          />
          <Slider
            data={nowPlaying.data}
            title={'Popular Movies'}
            listType={'movieList'}
            menuName="movies"
            mediaType="movie"
            uniqueKey="nowPlaying"
          />
          <Slider
            data={topRated.data}
            title={'TopRated Movies'}
            listType={'movieList'}
            menuName="movies"
            mediaType="movie"
            uniqueKey="topRated"
          />
          <Slider
            data={upcoming.data}
            title={'Upcoming Movies'}
            listType={'movieList'}
            menuName="movies"
            mediaType="movie"
            uniqueKey="upcoming"
          />
          <AnimatePresence>
            {bigMovieMatch && clickedMovie ? (
              <Modal
                dataId={clickedMovie.id}
                listType={`movieList${bigMovieMatch.params.kind}`}
                requestUrl="movie"
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
