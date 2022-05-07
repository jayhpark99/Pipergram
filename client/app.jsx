import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppContext from './lib/app-context';
import Auth from './pages/auth-form';
import Home from './pages/home';
import decodeToken from './lib/decode-token';

export default function App(props) {
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;

    const contextValue = { user };

    if (user) {
      setUser(user);
      setIsAuthorizing(false);
      console.log('user', user);
    }
  }, [user]);

  const handleSignIn = result => {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    setUser(user);
    setIsAuthorizing(false);
  };

  if (isAuthorizing === true) {
    return <Auth onSignIn={handleSignIn} />;
  }

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
