import { useLocation } from 'react-router-dom';

function Search() {
  const location = useLocation();
  /*
  console.log(location); 
  query가 하나라면 파싱하는데 무리가 없지만 여러개라면..? 

  JS 빌트인 메서드인 URLSearchParams에 인자로 해당 쿼리를 넣어주면
  아래처럼 쉽게 얻을 수 있다.

  const search = new URLSearchParams('?key=dune&region=kr');
  console.log(search.get('key')); // dune
  console.log(search.get('region')); // kr
  */
  const keyword = new URLSearchParams(location.search).get('keyword');
  console.log(keyword);

  return null;
}

export default Search;
