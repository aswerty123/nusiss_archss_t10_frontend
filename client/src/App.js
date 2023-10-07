import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Home } from './pages/Home';
import { ProfileDetails } from './components/ProfileDetails';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Profile } from './pages/Profile';
import { TestComponent } from './components/TestComponent';
import { CreateProduct } from './pages/CreateProduct';
import { TestBuyer } from './components/TestBuyer';
import { TestSeller } from './components/TestSeller';
import { ProductDetails } from './pages/ProductDetails';
// import { PrivateRoutes } from './utils/PrivateRoutes';

function App() {
  const { authData } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestComponent />} />

        <Route
          element={
            <PrivateRoutes redirectPath="/login" isAllowed={!!authData} />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Route>
        <Route
          element={
            <PrivateRoutes
              redirectPath="/home"
              isAllowed={!!authData && authData.role === 'buyer'}
            />
          }
        >
          <Route path="/test-buyer" element={<TestBuyer />} />
        </Route>
        <Route
          element={
            <PrivateRoutes
              redirectPath="/home"
              isAllowed={!!authData && authData.role === 'seller'}
            />
          }
        >
          <Route path="/test-seller" element={<TestSeller />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
