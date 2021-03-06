import { Outlet } from "react-router";
import { LoginProvider } from "../../contexts/LoginProvider";
import { useGeneralContext } from "../../contexts/StoreProvider";
import paths from "../paths";
import RedirectRoute from "../RedirectRoute";

export const GuestRoute = () => {
  const {
    state: {
      auth: { isAuthenticated },
    },
  } = useGeneralContext();

  if (isAuthenticated) {
    return <RedirectRoute pathname={paths.documentary.root} />;
  }

  return (
    <LoginProvider>
      <Outlet />
    </LoginProvider>
  );
};
