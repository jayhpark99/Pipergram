import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './lib/app-context';
import Auth from './pages/auth-form';
import Home from './pages/home';

export default function App(props) {
  const ctx = useContext(AuthContext);

  return (
  <>
    {!ctx.isAuthorized && <Auth/>}
    {ctx.isAuthorized && <Home/>}
  </>

  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     {/* <Route path="profile" element={<Profile />} /> */}
  //   </Routes>
  // </BrowserRouter>
  );
}
