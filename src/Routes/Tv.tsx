import { useQuery } from 'react-query';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { getTvs, IData, IGetTvResult } from '../api';
import Banner from '../Components/Banner';
import Modal from '../Components/Modal';
import Slider from '../Components/Slider';

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
  const bigMovieMatch = useMatch('/choflix/tv/tvShowList/:tvId');
  const { data: popularTvShows, isLoading } = useQuery<IGetTvResult>(
    ['tvs', 'popular'],
    getTvs
  );
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
