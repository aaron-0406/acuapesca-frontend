import { StoreProvider } from "../shared/contexts/StoreProvider";
import AppRouter from "../shared/routes/AppRouter";

export const App = () => {
  return (
    <StoreProvider>
      <div className="app">
        <AppRouter />
      </div>
    </StoreProvider>
  );
};
