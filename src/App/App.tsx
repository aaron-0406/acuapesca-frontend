import { StoreProvider } from "../shared/contexts/StoreProvider";
import { ThemeProvider } from "../shared/contexts/ThemeProvider";
import AppRouter from "../shared/routes/AppRouter";
import AutoLoader from "../ui/AutoLoader";
import { AutoLoaderProvider } from "../ui/AutoLoader/AutoLoaderProvider";
import GlobalStyle from "../ui/styles/global/globalStyles";

export const App = () => {

  return (
    <StoreProvider>
      <ThemeProvider>
        <AutoLoaderProvider>
          <GlobalStyle />
          <div className="app">
            <AutoLoader />
            <AppRouter />
          </div>
        </AutoLoaderProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
