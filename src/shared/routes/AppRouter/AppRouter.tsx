import { BrowserRouter, Route } from "react-router-dom";
import ErrorPage from "../../../pages/ErrorPage";
import Login from "../../../pages/Login";
import NotFound from "../../../pages/NotFound";
import AppSwitch from "../AppSwitch";
import { GuestRoute } from "../GuestRoutes/GuestRoute";
import paths from "../paths";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppSwitch>
        <Route path={paths.error} element={<ErrorPage />} />
        <Route path={paths.general.notFound} element={<NotFound />} />
        <Route path={paths.guest.login} element={<GuestRoute />}>
          <Route path={paths.guest.login} element={<Login />} />
          <Route
            path={paths.guest.loginConfirmation}
            element={<div>Hola</div>}
          />
        </Route>
      </AppSwitch>
    </BrowserRouter>
  );
};

export default AppRouter;
