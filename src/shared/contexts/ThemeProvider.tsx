import { createContext, useEffect, useState, useContext } from "react";
import {
  ILayoutTheme,
  ThemeProvider as ThemeStyleComponentProvider,
} from "styled-components";

import { darkTheme, lightTheme } from "../../ui/styles/global/themes";
import { DARK_THEME, LIGHT_THEME } from "../utils/constant/theme";

interface ThemeInfo {
  themeType: string;
  themeToggler: () => void;
  mountedComponent: boolean;
  theme: ILayoutTheme;
}
const noop = () => {
  // noop
};
const ThemeContext = createContext<ThemeInfo>({
  themeType: LIGHT_THEME,
  themeToggler: noop,
  mountedComponent: false,
  theme: lightTheme,
});

export const useThemeProvider = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Make sure to use ThemeContext inside of the provider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [themeType, setThemeType] = useState(LIGHT_THEME);
  const [mountedComponent, setMountedComponent] = useState(false);
  const setMode = (mode: string) => {
    window.localStorage.setItem("theme", mode);
    setThemeType(mode);
  };
  const themeToggler = () => {
    themeType === LIGHT_THEME ? setMode(DARK_THEME) : setMode(LIGHT_THEME);
    themeType === LIGHT_THEME ? setTheme(darkTheme) : setTheme(lightTheme);
  };
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme ? setThemeType(localTheme) : setMode(LIGHT_THEME);
    setMountedComponent(true);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ themeType, themeToggler, mountedComponent, theme }}
    >
      <ThemeStyleComponentProvider theme={theme}>
        {children}
      </ThemeStyleComponentProvider>
    </ThemeContext.Provider>
  );
};
