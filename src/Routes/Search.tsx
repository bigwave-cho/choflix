import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getSearchList, ISearchList } from '../api';
import Modal from '../Components/Modal';
import SearchModal from '../Components/SearchModal';
import { makeImagePath } from '../utills';

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 20px;
  color: black;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;

  @media only screen and (max-width: 1500px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  color: white;
  background-color: #544f4f;
  height: 20vh;
  background-image: url(${(props) => makeImagePath(props.bgphoto, 'w500')});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`;

const Title = styled(motion.div)``;

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const id = new URLSearchParams(location.search).get('id');
  const type = new URLSearchParams(location.search).get('type');
  const { data, isLoading } = useQuery<ISearchList>(
    ['searchList', keyword],
    () => getSearchList(keyword || '')
  );
  const onClick = (id: string, media_type: string) => {
    navigate(`/choflix/search?keyword=${keyword}&id=${id}&type=${media_type}`);
  };
  isLoading && <div>Loading...</div>;
  return (
    <Wrapper>
      {data?.results.map((item) => {
        console.log('a', item.id + 'searchItem');
        return (
          <Box
            layoutId={item.id + 'searchItem'}
            key={item.id}
            onClick={() => onClick(item.id + '', item.media_type)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            bgphoto={item.backdrop_path}
          >
            <div>
              {item.backdrop_path === null && "Sorry, there's no image"}
            </div>
            <Title>{item.name || item.title}</Title>
          </Box>
        );
      })}
      <AnimatePresence>
        {id && type && (
          <SearchModal dataId={+id} listType={'searchItem'} requestUrl={type} />
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Search;
