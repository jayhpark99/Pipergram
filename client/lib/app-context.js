import React, { useState, useEffect } from 'react';
import decodeToken from './decode-token';

const AuthContext = React.createContext({
  user: null,
  isAuthorized: false,
  onSignIn: () => { },
  onSignOut: () => { }
});

export const AuthContextProvider = props => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    if (user) {
      setUser(user);
      setIsAuthorized(true);
      console.log('user', user);
    }
  }, [user, isAuthorized]);

  const handleSignIn = result => {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    setUser(user);
    setIsAuthorized(true);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('react-context-jwt');
    setUser(null);
    setIsAuthorized(false);
  };

  return (
    <AuthContext.Provider value={{
      user: user,
      isAuthorized: isAuthorized,
      onSignIn: handleSignIn,
      onSignOut: handleSignOut
    }} >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
