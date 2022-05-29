import {
  BrowserRouter,
  BrowserRouterProps,
  Navigate,
  Routes,
} from "react-router-dom";
import paths from "../paths";

export const AppSwitch = ({ children, ...props }: BrowserRouterProps) => {
  return (
    <Routes {...props}>
      {children}
      {
        //<Navigate to={paths.general.notFound} replace={true} />
      }
    </Routes>
  );
};
