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
// import { PrivateRoutes } from './utils/PrivateRoutes';

const profileData = {
  address: [
    {
      _id: '6511f3369fbbe60019202fdb',
      street: 'Mumbai',
      postalCode: '400066',
      city: 'Mumbai',
      country: 'India',
      __v: 0,
    },
    {
      _id: '6511f3369fbbe60019202fdb',
      street: 'Mumbai',
      postalCode: '400066',
      city: 'Mumbai',
      country: 'India',
      __v: 0,
    },
  ],
  _id: '6511f2ba9fbbe60019202fd7',
  email: 'test5@test.com',
  phone: '12345',
  createdAt: '2023-09-25T20:51:06.778Z',
  updatedAt: '2023-09-25T20:53:10.037Z',
};

function App() {
  const { authData } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/search" element={<SearchAllProduct />} /> */}
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoutes />}>
    <Route index element={<Home />} />
  </Route> */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* <PrivateRoutes path="/" element={<Home />} /> */}
        {/* <ProtectedRoute path="/" element={<Home />} /> */}
        {/* <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home/>}/>
          </Route> */}
        {/* <Route
              path="/profile"
              element={<ProfileDetails profileData={profileData} />}
            /> */}
      </Routes>
    </>
  );
}

export default App;
