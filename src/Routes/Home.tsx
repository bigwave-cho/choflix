import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMoives, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utills';

const Wrapper = styled.div`
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: 100%;
  background-position: center center;

  @media screen and (max-width: 1400px) {
    height: 90%;
  }

  @media screen and (max-width: 1000px) {
    height: 70%;
    min-height: 400px;
  }

  @media screen and (max-width: 700px) {
    height: 60%;
    min-height: 400px;
  }

  @media screen and (max-width: 560px) {
    height: 50%;
    min-height: 400px;
    justify-content: flex-end;
  }
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 10px;

  @media only screen and (max-width: 1200px) {
    font-size: 4.2rem;
  }
  @media only screen and (max-width: 700px) {
    font-size: 2.6rem;
  }

  @media screen and (max-width: 560px) {
    margin-bottom: 50px;
  }
`;
const Overview = styled.p`
  font-size: 26px;
  width: 300px;

  @media only screen and (max-width: 1200px) {
    width: 20rem;
    font-size: 1rem;
    line-height: 2rem;
  }

  @media only screen and (max-width: 700px) {
    font-size: 0.8rem;
    line-height: 1.6rem;
  }

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const Slider = styled.div`
  position: relative;
  /* top: -100px; */
  display: flex;
  flex-direction: column;
  :hover .sliderBtn {
    opacity: 1;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;

  @media screen and (max-width: 560px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 64px;
  position: relative;

  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: fixed;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};

  @media screen and (max-width: 1000px) {
    width: 70%;
    height: 80vh;
  }
  @media screen and (max-width: 560px) {
    width: 90vw;
    height: 70vh;
  }
`;

const BigCover = styled(motion.div)`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;

  @media screen and (max-width: 560px) {
    width: 100%;
    height: 300px;
  }
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -60px;
  color: ${(props) => props.theme.white.lighter};
`;

const SlideBtn = styled(motion.button)`
  position: absolute;
  top: 300%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  color: #fff;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  z-index: 90;
  opacity: 0;
  cursor: pointer;
  &:hover {
    scale: 1.1;
    color: #000;
    background-color: #fff;
  }
  &:blur {
    color: #fff;
    background-color: #000;
  }

  @media only screen and (max-width: 560px) {
    width: 5rem;
    height: 5rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const LeftSlideBtn = styled(SlideBtn)`
  left: 10px;
`;

const RightSlideBtn = styled(SlideBtn)`
  right: 10px;
`;
const rowVariants = {
  hidden: (right: boolean) => {
    return {
      x: right ? window.innerWidth + 5 : -window.innerWidth - 5,
    };
  },
  visible: {
    x: 0,
  },
  exit: (right: boolean) => {
    return {
      x: right ? -window.innerWidth - 5 : +window.innerWidth + 5,
    };
  },
};

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 10,
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, type: 'tween', duration: 0.2 },
  },
  e: {
    scale: 5,
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, type: 'tween', duration: 0.2 },
  },
};

function Home() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch('/movies/:movieId');
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMoives
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isRight, setIsRight] = useState(false);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setIsRight(() => true);
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setIsRight(() => false);
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClicked = () => {
    navigate(-1);
  };

  const offset = 6;

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
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <h1>LATEST</h1>
            <LeftSlideBtn
              onClick={increaseIndex}
              className="sliderBtn"
            >{`<`}</LeftSlideBtn>
            <RightSlideBtn
              onClick={decreaseIndex}
              className="sliderBtn"
            >{`>`}</RightSlideBtn>

            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                custom={isRight}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
                transition={{ type: 'tween', duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ''}
                      key={movie.id}
                      variants={BoxVariants}
                      initial="normal"
                      whileHover={'hover'}
                      bgphoto={makeImagePath(movie.backdrop_path)}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top,black,transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
