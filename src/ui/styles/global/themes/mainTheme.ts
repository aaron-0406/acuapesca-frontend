import tokens from "../../design-tokens/json/styles.json";

export const colors = {
  "$color-primary-1": tokens.ColorPrimary1,
  "$color-primary-2": tokens.ColorPrimary2,
  "$color-transparent-1": tokens.ColorTransparent1,
  "$color-transparent-2": tokens.ColorTransparent2,
  "$color-transparent-3": tokens.ColorTransparent3,
  "$color-transparent-4": tokens.ColorTransparent4,
  "$color-disable": tokens.ColorDisable,
  "$color-details": tokens.ColorDetails,
  "$color-success": tokens.ColorSuccess,
  "$color-info": tokens.ColorInfo,
  "$color-warning": tokens.ColorWarning,
  "$color-error": tokens.ColorError,
  "$color-calendar": tokens.ColorCalendar,
  "$color-letter": tokens.ColorLetter,
  "$color-button-content": tokens.ColorButtonContent,
};

export const text = {
  fonts: {
    ralewayRegular: "Raleway Regular, sans-serif",
    ralewayMedium: "Raleway Medium, sans-serif",
    ralewaySemiBold: "Raleway Semi-Bold, sans-serif",
    mavenProRegular: "Maven Pro Regular, sans-serif",
    mavenProMedium: "Maven Pro Medium, sans-serif",
    mavenProSemiBold: "Maven Pro SemiBold, sans-serif",
    mavenProBold: "Maven Pro Bold, sans-serif",
    mavenProExtraBold: "Maven Pro ExtraBold, sans-serif",
    mavenProBlack: "Maven Pro Black, sans-serif",
  },
  display: {
    xl: tokens.DesktopFontDisplayRegularXl,
    l: tokens.DesktopFontDisplayRegularL,
    m: tokens.DesktopFontDisplayRegularM,
    s: tokens.DesktopFontDisplayRegularS,
    xs: tokens.DesktopFontDisplayRegularXs,
  },
  displayBold: {
    xl: tokens.DesktopFontDisplayBoldXl,
    l: tokens.DesktopFontDisplayBoldL,
    m: tokens.DesktopFontDisplayBoldM,
    s: tokens.DesktopFontDisplayBoldS,
    xs: tokens.DesktopFontDisplayBoldXs,
  },
  body: {
    xl: tokens.DesktopFontBodyRegularXl,
    l: tokens.DesktopFontBodyRegularL,
    m: tokens.DesktopFontBodyRegularM,
    s: tokens.DesktopFontBodyRegularS,
  },
  bodyBold: {
    xl: tokens.DesktopFontBodyBoldXl,
    l: tokens.DesktopFontBodyBoldL,
    m: tokens.DesktopFontBodyBoldM,
    s: tokens.DesktopFontBodyBoldS,
  },
  opacity: {
    primary: "0.85",
    secondary: "0.45",
    disabled: "0.25",
  },
};

const sizing = {
  button: {
    large: "360px",
  },
  input: {
    large: "360px",
  },
  sidebar: "208px",
};

export const spacing = {
  cornerRadiusSmall: "4px",
};

export const shadows = {
  elevationLow: "0px 1px 0px rgba(240,240,240,1)",
  elevationMedium: "0px 3px 8px rgba(0, 0, 0, 0.12)",
  elevationHigh: "0px 7px 16px rgba(0, 0, 0, 0.12)",
};

const mainTheme = {
  colors,
  text,
  sizing,
  spacing,
  shadows,
};

export default mainTheme;
