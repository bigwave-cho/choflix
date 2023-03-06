import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getDetailInfo, getSearchList, IData, IDetailInfo } from '../api';
import { makeImagePath } from '../utills';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 100px;
  width: 50%;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 10;

  @media screen and (max-width: 1400px) {
    width: 70%;
    height: 70%;
  }

  @media screen and (max-width: 1000px) {
    width: 70%;
    height: 70%;
  }

  @media screen and (max-width: 560px) {
    width: 90vw;
    height: 50%;
  }
`;

const ModalCover = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 60%;
  background-color: white;
  background-size: cover;
  background-position: center center;
`;

const CoverTitle = styled.p`
  position: absolute;
  color: white;
  font-size: 40px;
  bottom: 0px;
  left: 20px;

  @media only screen and (max-width: 1000px) {
    font-size: 30px;
  }
`;
const ModalContents = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

interface IModal {
  dataId?: number;
  listType: string;
  menuName?: string;
  requestUrl: string;
}

export default function SearchModal({ dataId, listType, requestUrl }: IModal) {
  const navigate = useNavigate();
  const { data } = useQuery<IDetailInfo>(['search', dataId], () =>
    getDetailInfo(dataId + '', requestUrl)
  );
  const onOverlayClicked = () => {
    navigate(-1);
  };
  return (
    <AnimatePresence>
      <Overlay onClick={onOverlayClicked} />
      <ModalContainer layoutId={dataId + listType}>
        <ModalCover
          style={{
            backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
              data?.backdrop_path || ''
            )})`,
          }}
        >
          <CoverTitle>{data?.name}</CoverTitle>
        </ModalCover>
        <ModalContents>
          <div style={{ width: '60%' }}>{data?.overview || ''}</div>
          <div>
            <span>{data?.first_air_date || ''}</span>
            <span style={{ marginLeft: '15px' }}>
              {/* {data?.genres[0].name || ''} */}
            </span>
            <span style={{ marginLeft: '15px' }}>{`평점: ${
              data?.vote_average || '정보 없음'
            }`}</span>
          </div>
        </ModalContents>
      </ModalContainer>
    </AnimatePresence>
  );
}
