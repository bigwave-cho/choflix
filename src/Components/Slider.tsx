import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IGetTvResult } from '../api';
import { slideCnt } from '../atoms';
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';
import { makeImagePath } from '../utills';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import Modal from './Modal';

const Wrapper = styled(motion.div)`
  position: relative;
  min-height: 250px;
  top: -150px;
  margin-bottom: 50px;
  :hover .arrow {
    opacity: 1;
  }
`;

const SliderTitle = styled.p`
  margin-left: 20px;
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const ArrowBtn = styled(motion.div)<{ mobile: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  color: #fff;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${isMobile ? 1 : 0};
  transition: all 0.3s;
  z-index: 90;
  cursor: pointer;
  &:hover {
    color: #000;
    background-color: #fff;
  }
  &:blur {
    color: #fff;
    background-color: #000;
  }
`;

const LeftArrowBtn = styled(ArrowBtn)`
  left: 10px;
`;

const RightArrowBtn = styled(ArrowBtn)`
  right: 10px;
`;

const Row = styled(motion.div)<{ gridcnt: number }>`
  position: absolute;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridcnt}, 1fr);
  gap: 5px;
`;

const Box = styled(motion.div)<{ bgphoto: string; offset: number }>`
  display: block;
  float: left;
  width: 100%;
  height: 16rem;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  font-size: 4rem;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: relative;
  width: 100%;
  top: 205px;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: white;
  }
`;

const rowVariants = {
  hidden: (right: number) => {
    return {
      x: right === 1 ? window.innerWidth + 5 : -window.innerWidth - 5,
    };
  },
  visible: {
    x: 0,
    y: 0,
  },
  exit: (right: number) => {
    return {
      x: right === 1 ? -window.innerWidth - 5 : window.innerWidth + 5,
    };
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      type: 'tween',
      delay: 0.3,
      duration: 0.2,
    },
  },
};
///////
const infoVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
  },
};

interface ISliderProps {
  data: IGetTvResult;
  title: string;
  listType: string;
  menuName: string;
  mediaType: string;
  uniqueKey: string;
}

export default function Slider({
  data,
  title,
  listType,
  menuName,
  mediaType,
  uniqueKey,
}: ISliderProps) {
  const offset = useRecoilValue(slideCnt);
  const [isRight, setIsRight] = useState(1);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = (value: boolean) => {
    setLeaving(value);
  };
  const changeIndex = (right: number) => {
    if (leaving) return;

    if (data) {
      toggleLeaving(true);
      setIsRight(right);
      const totalLength = data.results.length;

      const maxIndex =
        totalLength % offset === 0
          ? Math.floor(totalLength / offset) - 1
          : Math.floor(totalLength / offset);

      right === 1
        ? setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
        : setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  useEffect(() => {
    if (data) {
      const dataTotalLen = data.results.length;
      const maxIdx =
        dataTotalLen % offset === 0
          ? Math.floor(dataTotalLen / offset) - 1
          : Math.floor(dataTotalLen / offset);

      if (index > maxIdx) {
        setIndex(maxIdx);
      }
    }
  }, [offset, data, index, setIndex]);

  const navigate = useNavigate();
  const onBoxClicked = (
    menu: string,
    type: string,
    id: number,
    uniqueKey: string
  ) => {
    mediaType === 'tv'
      ? navigate(`/choflix/${menu}/${type}/${id}?kind=${uniqueKey}`)
      : navigate(`/choflix/${menu}/${id}/${uniqueKey}`);
  };
  const bigMatch: PathMatch<string> | null = useMatch(
    `/${menuName}/${listType}/:id`
  );

  const rowProps = {
    gridcnt: offset,
    custom: isRight,
    variants: rowVariants,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    transition: { type: 'tween', duration: 1 },
    key: index,
  };

  const onClickToArrowBtn = (right: number) => {
    if (!leaving) {
      changeIndex(right);
    }
  };
  return (
    <Wrapper>
      <SliderTitle>{title}</SliderTitle>
      <LeftArrowBtn
        mobile={isMobile ? 1 : 0}
        className="arrow"
        onClick={() => onClickToArrowBtn(-1)}
      >
        <i
          className={`fa-solid fa-arrow-left ${
            window.innerWidth > 560 ? 'fa-2xl' : ''
          }`}
        ></i>
      </LeftArrowBtn>
      <RightArrowBtn
        mobile={isMobile ? 1 : 0}
        className="arrow"
        onClick={() => onClickToArrowBtn(1)}
      >
        <i
          className={`fa-solid fa-arrow-right ${
            window.innerWidth > 560 ? 'fa-2xl' : ''
          }`}
        ></i>
      </RightArrowBtn>
      <AnimatePresence
        initial={false}
        onExitComplete={() => toggleLeaving(false)}
        custom={isRight}
      >
        <Row {...rowProps}>
          {data?.results
            .slice(offset * index, offset * index + offset)
            .map((item) => {
              return (
                <Box
                  key={item.id}
                  variants={boxVariants}
                  style={{ color: 'black' }}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: 'tweent' }}
                  layoutId={item.id + listType + uniqueKey}
                  bgphoto={makeImagePath(item.backdrop_path || '', 'w500')}
                  offset={offset}
                  onClick={() => {
                    onBoxClicked(menuName, listType, item.id, uniqueKey);
                  }}
                >
                  <Info variants={infoVariants}>
                    <h4>{item.title ? item.title : item.name}</h4>
                  </Info>
                </Box>
              );
            })}
        </Row>
      </AnimatePresence>
      <AnimatePresence>
        {bigMatch ? (
          <Modal
            dataId={Number(bigMatch?.params.id)}
            listType={listType}
            menuName={menuName}
            requestUrl={mediaType}
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
