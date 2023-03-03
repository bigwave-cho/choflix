import { useQuery } from 'react-query';
import { getMoives } from '../api';

function Home() {
  //useQuery(식별키, )
  //식별키는 string || array

  // ## 이미지 path만 주는데 어떻게 받아오는지 문서 설명.
  //https://developers.themoviedb.org/3/getting-started/images
  const { data, isLoading } = useQuery(['movies', 'nowPlaying'], getMoives);
  console.log(data, isLoading);
  return (
    <div style={{ backgroundColor: 'whitesmoke', height: '200vh' }}>HOME</div>
  );
}
export default Home;
