import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  getMoives,
  getTvs,
  IData,
  IGetMoviesResult,
  IGetTvResult,
} from '../api';
import Banner from '../Components/Banner';
import Modal from '../Components/Modal';
import Slider from '../Components/Slider';
import Slider2 from '../Components/Slider2';
import { makeImagePath } from '../utills';

const Wrapper = styled.div``;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const SliderContainer = styled.div`
  background-color: transparent;
  position: relative;
  top: -200px;
  @media screen and (max-width: 1000px) {
    top: -150px;
  }
`;

function Tv() {
  // const navigate = useNavigate();
  const bigMovieMatch = useMatch('/choflix/tv/tvShowList/:tvId');
  const { data: popularTvShows, isLoading } = useQuery<IGetTvResult>(
    ['tvs', 'popular'],
    getTvs
  );
  console.log(bigMovieMatch?.params.tvId);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={popularTvShows?.results[0] as IData}
            detailSearchUrl={`tv/banner`}
            requestUrl={'tv'}
          />
          <SliderContainer>
            <Slider
              data={popularTvShows!}
              title={'Popular Tv Shows'}
              listType={'tvShowList'}
              menuName="tv"
              mediaType="tv"
            />
            {/* <Slider2
              data={popularTvShows!}
              title={'Popular Tv Shows'}
              listType={'tvShowList'}
              menuName="tv"
              mediaType="tv"
            /> */}
          </SliderContainer>
          {bigMovieMatch && (
            <Modal
              dataId={+bigMovieMatch?.params.tvId!}
              listType="tvShowList"
              requestUrl="tv"
            ></Modal>
          )}
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
