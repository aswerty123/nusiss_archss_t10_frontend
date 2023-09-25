import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Home } from './pages/Home';
import { SearchAllProduct } from './pages/SearchAllProduct';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchAllProduct />} />
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/login" element={<Login />} />
          {/* <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home/>}/>
          </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
