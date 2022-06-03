import { Outlet } from "react-router-dom";
import MainLayout from "../../../ui/Layouts/MainLayout";
import { useGeneralContext } from "../../contexts/StoreProvider";
import storage from "../../utils/storage";
import paths from "../paths";
import RedirectRoute from "../RedirectRoute";

export const ProtectedRoutes = () => {
  const {
    state: {
      auth: { isAuthenticated },
    },
  } = useGeneralContext();

  if (!isAuthenticated) {
    storage.clear();
    return <RedirectRoute pathname={paths.guest.login} />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
