import { useMatch, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { IData } from '../api';
import Banner from '../Components/Banner';
import Modal from '../Components/Modal';
import Slider from '../Components/Slider';
import { useMultipleQueries } from '../Hook/useMultipleQuery';

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
  @media screen and (max-width: 1000px) {
    top: 50px;
  }
`;

function Tv() {
  const bigMovieMatch = useMatch('/choflix/tv/tvShowList/:tvId');
  const [searchParams] = useSearchParams();
  const [latestTv, popularTv, airingTv, topRatedTv] = useMultipleQueries('tv');
  const isLoading =
    latestTv.isLoading ||
    popularTv.isLoading ||
    airingTv.isLoading ||
    topRatedTv.isLoading;

  if (isLoading) return <div>Loading...</div>;
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bannerInfo={popularTv.data?.results[0] as IData}
            detailSearchUrl={`tv/banner`}
            requestUrl={'tv'}
          />
          <SliderContainer>
            <Slider
              data={popularTv?.data}
              title={'Popular Tv Shows'}
              listType={'tvShowList'}
              menuName="tv"
              mediaType="tv"
              uniqueKey="popular"
            />
            <Slider
              data={airingTv.data}
              title={'Airing Tv Shows'}
              listType={'tvShowList'}
              menuName="tv"
              mediaType="tv"
              uniqueKey="airing"
            />
            <Slider
              data={topRatedTv.data}
              title={'Airing Tv Shows'}
              listType={'tvShowList'}
              menuName="tv"
              mediaType="tv"
              uniqueKey="topRatedTv"
            />
          </SliderContainer>
          {bigMovieMatch && (
            <Modal
              dataId={+bigMovieMatch?.params.tvId!}
              listType={`tvShowList${searchParams.get('kind')}`}
              requestUrl="tv"
            />
          )}
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
