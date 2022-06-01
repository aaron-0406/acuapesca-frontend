import { Outlet, RouteProps } from "react-router";
import { LoginProvider } from "../../contexts/LoginProvider";
import { useGeneralContext } from "../../contexts/StoreProvider";
import paths from "../paths";
import RedirectRoute from "../RedirectRoute";

export type GeneralRouteProps = RouteProps & {
  homePath: string;
};

export const GuestRoute = () => {
  const {
    state: {
      auth: { isAuthenticated },
    },
  } = useGeneralContext();

  if (isAuthenticated) {
    return <RedirectRoute pathname={paths.documents.root} />;
  }

  return (
    <LoginProvider>
      <Outlet />
    </LoginProvider>
  );
};
