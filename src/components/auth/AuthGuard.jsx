// src/components/auth/AuthGuard.jsx
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as jwtDecode from 'jwt-decode'; // Change the import to use namespace import

const AuthGuard = ({ children, userType }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !user) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decodedToken = jwtDecode.jwtDecode(token); // Use the named import
      const isTokenValid = decodedToken.exp * 1000 > Date.now();
      const hasCorrectUserType = user.user_type === userType;

      setIsAuthorized(isTokenValid && hasCorrectUserType);
    } catch (error) {
      setIsAuthorized(false);
    }
  }, [userType]);

  if (isAuthorized === null) {
    return null; // or a loading spinner
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default AuthGuard;