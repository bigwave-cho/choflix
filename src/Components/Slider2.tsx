import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { IGetTvResult } from '../api';
import { makeImagePath } from '../utills';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useRecoilValue } from 'recoil';
import { slideCnt } from '../atoms';
import { isMobile } from 'react-device-detect';

const Wrapper = styled(motion.div)`
  position: relative;
  min-height: 24.9rem;
  overflow: hidden;
  :hover .arrow {
    opacity: 1;
  }
`;

const Title = styled.div`
  font-size: 2.4rem;
  padding-left: 2rem;
  font-weight: 700;
  padding-bottom: 1rem;
`;

const ArrowBtn = styled(motion.div)<{ mobile: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  color: #fff;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => props.mobile};
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
  svg {
    width: 2.8rem;
    height: 2.8rem;
  }
  @media only screen and (max-width: 500px) {
    width: 5rem;
    height: 5rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const LeftArrowBtn = styled(ArrowBtn)`
  left: 0;
`;

const RightArrowBtn = styled(ArrowBtn)`
  right: 0;
`;

const Row = styled(motion.div)<{ gridcnt: number }>`
  position: absolute;
  left: 0;
  margin-bottom: 3rem;
  width: 100%;
  clear: both;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string; offset: number }>`
  display: block;
  float: left;
  width: calc(100% / ${(props) => props.offset} - 5px);
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
  & ~ & {
    margin-left: 0.6rem;
  }
`;

const Info = styled(motion.div)`
  position: relative;
  top: 15.8rem;
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 1.8rem;
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
    scale: 1.05,
    y: -50,
    transition: {
      type: 'tween',
      delay: 0.3,
      duration: 0.2,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      delay: 0.5,
      duration: 0.3,
    },
  },
};

interface ISlider {
  data: IGetTvResult;
  title: string;
  listType: string;
  menuName: string;
  mediaType: string;
}

export default function Slider2({
  data,
  title,
  listType,
  menuName,
  mediaType,
}: ISlider) {
  const offset = useRecoilValue(slideCnt);
  const [isRight, setIsRight] = useState(1); // left: -1, right: 1
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = (value: boolean) => {
    setLeaving(value);
  };
  const changeIndex = (right: number) => {
    // 슬라이더 버튼 및 드래그로 강제 흘러감 방지용
    if (leaving) return;

    if (data) {
      toggleLeaving(true); // true 처리용 > 강제 흘러감 방지
      setIsRight(right);
      const totalLength = data.results.length;
      //20개 리스트에서 18개만 보여주기 위해 floor처리
      const maxIndex =
        totalLength % offset === 0
          ? Math.floor(totalLength / offset) - 1
          : Math.floor(totalLength / offset);

      right === 1
        ? setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
        : setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  //resize로 인해 index의 값이 엄청 커진상태에서 offset개수가 많아지면 값이 안맞는 현상 막기위해 재연산처리추가
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
  const onBoxClicked = (menu: string, type: string, id: number) => {
    navigate(`/${menu}/${type}/${id}`);
  };
  const bigMatch: PathMatch<string> | null = useMatch(
    `/${menuName}/${listType}/:id`
  );

  const mobile = isMobile ? 1 : 0; //mobile인지 아닌지 구분용

  /**
   * Row 컴포넌트 props
   */
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
      <Title>{title}</Title>
      <LeftArrowBtn
        mobile={mobile ? 1 : 0}
        className="arrow"
        onClick={() => onClickToArrowBtn(-1)}
      ></LeftArrowBtn>
      <RightArrowBtn
        mobile={mobile ? 1 : 0}
        className="arrow"
        onClick={() => onClickToArrowBtn(1)}
      ></RightArrowBtn>
      <AnimatePresence
        initial={false}
        onExitComplete={() => toggleLeaving(false)}
        custom={isRight}
      >
        <Row {...rowProps}>
          {data?.results
            .slice(offset * index, offset * index + offset)
            .map((d) => (
              <Box
                key={d.id}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: 'tween' }}
                layoutId={d.id + '' + listType}
                bgphoto={makeImagePath(d.backdrop_path || '', 'w500')}
                offset={offset}
                onClick={() => {
                  onBoxClicked(menuName, listType, d.id);
                }}
              >
                <Info variants={infoVariants}>
                  <h4>{d.title ? d.title : d.name}</h4>
                </Info>
              </Box>
            ))}
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
