import styled from 'styled-components';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { makeImagePath } from '../utills';
import { IData } from '../api';
import Modal from './Modal';

const Wrapper = styled.div<{ bgphoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  min-height: 1000px;
  padding: 6.8rem 6rem;
  background-repeat: no-repeat;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: 100%;
  background-position: center center;

  @media screen and (max-width: 1400px) {
    height: 80%;
    min-height: 800px;
  }

  @media screen and (max-width: 1200px) {
    height: 30%;
    min-height: 700px;
  }

  @media screen and (max-width: 1000px) {
    height: 55%;
    min-height: 600px;

    padding: 4.2rem 6rem;
  }
  @media screen and (max-width: 700px) {
    min-height: 600px;
  }
  @media screen and (max-width: 500px) {
    height: 10%;
    min-height: 500px;
    padding: 3.4rem 3rem;
  }
  @media screen and (min-width: 216px) {
    background-position: center top;
  }
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 900;
  @media only screen and (max-width: 1200px) {
    font-size: 2.2rem;
  }
  @media only screen and (max-width: 700px) {
    font-size: 1.6rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 350px) {
    margin: 0;
  }
`;

const Overview = styled.p`
  margin-bottom: 2rem;
  width: 40.8rem;
  font-size: 1rem;
  font-weight: 700;
  line-height: 2.5rem;
  @media only screen and (max-width: 1200px) {
    width: 40rem;
    font-size: 1rem;
    line-height: 2rem;
  }
  @media only screen and (max-width: 1000px) {
    width: 20rem;
    font-size: 1rem;
    line-height: 1.8rem;
  }
  @media only screen and (max-width: 700px) {
    font-size: 0.8rem;
    line-height: 1.6rem;
  }
  @media only screen and (max-width: 560px) {
    width: 20rem;
  }
  @media only screen and (max-width: 350px) {
    opacity: 0;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 1vw;
`;

interface IBannerBtn {
  color: string;
  bgcolor: string;
  hovercolor: string;
}

const BannerBtn = styled(motion.button)<IBannerBtn>`
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  background-color: rgba(180, 174, 174, 0.3);
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.hovercolor};
  }
  @media only screen and (max-width: 1200px) {
    padding: 15px;
    border-radius: 1.5rem;
  }
  @media only screen and (max-width: 700px) {
    padding: 12px;
    border-radius: 1.2rem;
  }
`;

const DetailInfoBtn = styled(BannerBtn)`
  width: 12rem;
  @media only screen and (max-width: 1000px) {
    width: 10rem;
  }
`;

const BtnText = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 400;
  @media only screen and (max-width: 1200px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

function Banner({
  bannerInfo,
  detailSearchUrl,
  requestUrl,
}: {
  bannerInfo: IData;
  detailSearchUrl?: string;
  requestUrl?: string;
}) {
  const bigMatch: PathMatch<string> | null = useMatch(
    `/choflix/:menuName/banner/:id`
  );
  const navigate = useNavigate();
  const onBoxClicked = (id: number) => {
    navigate(`/choflix/${detailSearchUrl}/${id}`);
  };
  const bannerBgSize = window.innerWidth < 560 ? 'w500' : '';
  return (
    <Wrapper
      bgphoto={makeImagePath(bannerInfo.backdrop_path || '', bannerBgSize)}
    >
      <Title>{bannerInfo.title ? bannerInfo.title : bannerInfo.name}</Title>
      <Overview>{bannerInfo.overview}</Overview>
      <ButtonArea>
        {detailSearchUrl !== 'home' && (
          <DetailInfoBtn
            color={'#fff'}
            bgcolor={'rgba(109, 109, 110, 0.7)'}
            hovercolor={'rgba(109, 109, 110, 0.4)'}
            onClick={() => onBoxClicked(bannerInfo.id)}
          >
            <BtnText>상세 정보</BtnText>
          </DetailInfoBtn>
        )}
      </ButtonArea>
      <AnimatePresence>
        {bigMatch ? (
          <Modal
            dataId={Number(bigMatch?.params.id)}
            listType={`detail${requestUrl}`}
            menuName={bigMatch?.params.menuName || ''}
            requestUrl={requestUrl || ''}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Banner;
