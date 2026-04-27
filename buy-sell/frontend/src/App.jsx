import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from "./pages/Cart/Cart";
import History from "./pages/OrderHis/History";
import Profile from './pages/Profile/Profile';
import Registration from './pages/Registration/Registration';
import Orders from './pages/Orders/Orders';
import Login from './pages/Registration/Login';
import { AppProvider } from './MyContext';
import Seller from './pages/Home/Seller';
import Items_show from './pages/Item/Items_show';
import MyListings from './pages/MyListings/MyListings';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("userToken");
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/home/:category/:search" element={<ProtectedRoute element={<Items_show/>} />} />
          <Route path="/home/:search" element={<ProtectedRoute element={<Items_show/>} />} />
          <Route path="/home/:category" element={<ProtectedRoute element={<Items_show/>} />} />

          <Route path='/profile/:userId' element={<ProtectedRoute element={<Profile />} />} />
          <Route path='/cart' element={<ProtectedRoute element={<Cart />} />} />
          <Route path='/history' element={<ProtectedRoute element={<History />} />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/orders' element={<ProtectedRoute element={<Orders />} />} />
          <Route path='/seller' element={<ProtectedRoute element={<Seller />} />} />
          <Route path='/my-listings' element={<ProtectedRoute element={<MyListings />} />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
