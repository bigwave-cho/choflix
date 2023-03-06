import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route
          path={`${process.env.PUBLIC_URL}/movies/:movieId`}
          element={<Home />}
        />
        <Route path={`${process.env.PUBLIC_URL}/tv`} element={<Tv />} />
        <Route
          path={`${process.env.PUBLIC_URL}/tv/banner/:tvId`}
          element={<Tv />}
        />

        <Route
          path={`${process.env.PUBLIC_URL}/tv/tvShowList/:tvId`}
          element={<Tv />}
        />
        <Route path={`${process.env.PUBLIC_URL}/search`} element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
