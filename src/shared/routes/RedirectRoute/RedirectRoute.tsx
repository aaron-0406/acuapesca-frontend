import { Navigate, useLocation } from "react-router";

type RedirecRouteProps = {
  pathname: string;
};

export const RedirectRoute: React.FC<RedirecRouteProps> = ({ pathname }) => {
  const currentLocation = useLocation();
  return <Navigate to={pathname} state={{ from: currentLocation }} replace />;
};
