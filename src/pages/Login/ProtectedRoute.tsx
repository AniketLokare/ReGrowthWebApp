import React, { PropsWithChildren, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { rolesAllowedRoutes } from 'src/constants/auth';
import { UNAUTHORIZED_PATH } from 'src/constants/paths';
import Layout from 'src/pages/Layout';
import { getAllowedRoutes, getAuthInfo, isRefreshTokenExpired, isUserLoggedIn, refreshAccessToken } from 'src/util/auth';

const doesRouteMatch = (path: string, allowedRoutes: Set<string>) => {
  return Array.from(allowedRoutes).some(route => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`);
    return regex.test(path);
  });
};

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { accessTokenExpiry } = getAuthInfo();
  const allowedRoutes = isUserLoggedIn() && getAllowedRoutes(rolesAllowedRoutes);

  useEffect(() => {
    const now = new Date().getTime();
    if (isUserLoggedIn() && accessTokenExpiry && accessTokenExpiry - now < 300000) {
      refreshAccessToken();
    }
  }, [accessTokenExpiry]);

  const pathname = location.pathname + location.search;
  const isRouteAllowed = allowedRoutes && doesRouteMatch(location.pathname, allowedRoutes);

  if (!isUserLoggedIn() || isRefreshTokenExpired()) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  } else if (allowedRoutes && !isRouteAllowed) {
    return <Navigate to={UNAUTHORIZED_PATH} state={{ from: pathname }} />;
  }

  return <Layout>{children || <Outlet />}</Layout>;
};

export default ProtectedRoute;