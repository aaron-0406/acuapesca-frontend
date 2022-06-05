import { Route } from "react-router-dom";
import Procedures from "../../../pages/DocumentManagement/Documentary/Procedures";
import Processes from "../../../pages/DocumentManagement/Documentary/Processes";
import ErrorPage from "../../../pages/ErrorPage";
import Login from "../../../pages/Login";
import NotFound from "../../../pages/NotFound";
import AppSwitch from "../AppSwitch";
import { GuestRoute } from "../GuestRoutes/GuestRoute";
import paths from "../paths";
import ProtectedRoutes from "../ProtectedRoutes";

const AppRouter = () => {
  return (
    <AppSwitch>
      <Route path={paths.error} element={<ErrorPage />} />
      <Route path={paths.general.notFound} element={<NotFound />} />
      <Route element={<GuestRoute />}>
        <Route path={paths.guest.login} element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path={paths.documentary.roles} element={<div>Roles</div>} />
        <Route path={paths.documentary.users} element={<div>Users</div>} />
        <Route path={paths.documentary.root} element={<Processes />} />
        <Route
          path={paths.documentary.procedimientos}
          element={<Procedures />}
        />
      </Route>
    </AppSwitch>
  );
};

export default AppRouter;
