import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Home } from './pages/Home';
import { useAuth } from './context/AuthContext';
import { Profile } from './pages/Profile';
import { CreateProduct } from './pages/CreateProduct';
import { ProductDetails } from './pages/ProductDetails';
import { SearchItem } from './pages/SearchItem';
import { Landing } from './pages/Landing';
import { CartDetails } from './pages/CartDetails';
import { OrderDetails } from './pages/OrderDetails';
import { OrderList } from './pages/OrderList';
import { PageNotFound } from './components/PageNotFound';
import { RedirectBuyer } from './components/RedirectBuyer';
import { RedirectSeller } from './components/RedirectSeller';

function App() {
  const { authData } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchItem />} />
        <Route path="/" element={<Landing />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/redirect-buyer" element={<RedirectBuyer />} />
        <Route path="/redirect-seller" element={<RedirectSeller />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          element={
            <PrivateRoutes redirectPath="/login" isAllowed={!!authData} />
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route
          element={
            <PrivateRoutes
              redirectPath="/redirect-seller"
              isAllowed={!!authData && authData.role === 'buyer'}
            />
          }
        >
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order-list" element={<OrderList />} />
        </Route>
        <Route
          element={
            <PrivateRoutes
              redirectPath="/redirect-buyer"
              isAllowed={!!authData && authData.role === 'seller'}
            />
          }
        >
          <Route path="/create-product" element={<CreateProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
