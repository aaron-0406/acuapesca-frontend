import { ILayoutTheme } from "styled-components";

import mainTheme from "./mainTheme";

const darkTheme: ILayoutTheme = {
  ...mainTheme,
  colors: {
    ...mainTheme.colors,
  },
};

export default darkTheme;
