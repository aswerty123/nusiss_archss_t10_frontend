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
// import { PrivateRoutes } from './utils/PrivateRoutes';



function App() {
  const { authData } = useAuth();

  return (
    <>
      <Header />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestComponent />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
