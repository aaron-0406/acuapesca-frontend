import { ILayoutTheme } from "styled-components";

import mainTheme from "./mainTheme";

const lightTheme: ILayoutTheme = {
  ...mainTheme,
  colors: {
    ...mainTheme.colors,
  },
};

export default lightTheme;
