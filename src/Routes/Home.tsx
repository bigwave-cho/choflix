import { AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { getMoives, IData, IGetMoviesResult } from '../api';
import Banner from '../Components/Banner';
import Modal from '../Components/Modal';
import Slider from '../Components/Slider';

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const bigMovieMatch = useMatch('/choflix/movies/:movieId');
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMoives
  );

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + '' === bigMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={data?.results[0] as IData}
            detailSearchUrl="home"
          />
          <Slider
            data={data!}
            title={'Popular Movies'}
            listType={'movieList'}
            menuName="movies"
            mediaType="movie"
          />
          <AnimatePresence>
            {bigMovieMatch && clickedMovie ? (
              <Modal
                dataId={clickedMovie.id}
                listType="movieList"
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
