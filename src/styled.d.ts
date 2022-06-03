// import original module declarations
import "styled-components";

declare module "*.jpg";
declare module "*.png";
// and extend them!
declare module "styled-components" {
  export interface IBaseTheme {
    colors: IBaseThemeColors;
    shadows: IBaseShadows;
    spacing: IBaseThemeSpacing;
    text: IBaseThemeText;
    sizing: IBaseThemeSizing;
  }

  export interface ILayoutTheme extends IBaseTheme {
    // layoutColors: {}
  }

  export interface DefaultTheme extends ILayoutTheme {}

  export interface IBaseThemeColors {
    "$color-primary-1": string;
    "$color-primary-2": string;
    "$color-transparent-1": string;
    "$color-transparent-2": string;
    "$color-transparent-3": string;
    "$color-transparent-4": string;
    "$color-disable": string;
    "$color-details": string;
    "$color-success": string;
    "$color-info": string;
    "$color-warning": string;
    "$color-error": string;
    "$color-calendar": string;
    "$color-black": string;
    "$color-white": string;
    "$color-secondary-1": string;
    "$color-secondary-2": string;
    "$color-secondary-3": string;
    "$color-secondary-4": string;
    "$color-secondary-5": string;
    "$color-secondary-6": string;
    "$color-tertiary-1": string;
    "$color-tertiary-2": string;
    "$color-tertiary-3": string;
    "$color-tertiary-4": string;
    "$color-tertiary-5": string;
    "$color-tertiary-6": string;
    "$color-neutral-1": string;
    "$color-neutral-2": string;
    "$color-neutral-3": string;
    "$color-neutral-4": string;
    "$color-neutral-5": string;
    "$color-neutral-6": string;
    "$color-neutral-7": string;
    "$color-neutral-8": string;
    "$color-neutral-9": string;
    "$color-success-1": string;
    "$color-success-2": string;
    "$color-success-3": string;
    "$color-success-4": string;
    "$color-success-5": string;
    "$color-success-6": string;
    "$color-warning-1": string;
    "$color-warning-2": string;
    "$color-warning-3": string;
    "$color-warning-4": string;
    "$color-warning-5": string;
    "$color-warning-6": string;
    "$color-danger-1": string;
    "$color-danger-2": string;
    "$color-danger-3": string;
    "$color-danger-4": string;
    "$color-danger-5": string;
    "$color-danger-6": string;
    blackAlpha2: string;
    blackAlpha6: string;
    blackAlpha15: string;
    blackAlpha25: string;
    blackAlpha45: string;
    blackAlpha85: string;
    cyan5: string;
    cyan7: string;
    yellow1: string;
    white: string;
    transparent: string;
    gray: string;
    icons: string;
    neutralGray: string;
    polarGreen6: string;
    magenta6: string;
    "$color-transparent-dark-10": string;
    "$color-transparent-dark-25": string;
    "$color-transparent-dark-40": string;
    "$color-transparent-dark-65": string;
    "$color-transparent-dark-75": string;
    "$color-transparent-dark-95": string;
    "$color-transparent-light-10": string;
    "$color-transparent-light-25": string;
    "$color-transparent-light-40": string;
    "$color-transparent-light-65": string;
    "$color-transparent-light-75": string;
    "$color-transparent-light-95": string;
  }

  export interface IBaseThemeSpacing {
    cornerRadiusSmall: string;
  }

  export interface IBaseThemeFontProps {
    fontSize: number;
    textDecoration: string;
    fontFamily: string;
    fontWeight: number;
    fontStyle: string;
    fontStretch: string;
    letterSpacing: number;
    lineHeight: number;
    paragraphIndent: number;
    paragraphSpacing: number;
    textCase: string;
  }
  export interface IBaseThemeText {
    fonts: {
      ralewayRegular: string;
      ralewayMedium: string;
      ralewaySemiBold: string;
      mavenProRegular: string;
      mavenProMedium: string;
      mavenProSemiBold: string;
      mavenProBold: string;
      mavenProExtraBold: string;
      mavenProBlack: string;
    };
    display: {
      xl: IBaseThemeFontProps;
      l: IBaseThemeFontProps;
      m: IBaseThemeFontProps;
      s: IBaseThemeFontProps;
      xs: IBaseThemeFontProps;
    };
    displayBold: {
      xl: IBaseThemeFontProps;
      l: IBaseThemeFontProps;
      m: IBaseThemeFontProps;
      s: IBaseThemeFontProps;
      xs: IBaseThemeFontProps;
    };
    body: {
      xl: IBaseThemeFontProps;
      l: IBaseThemeFontProps;
      m: IBaseThemeFontProps;
      s: IBaseThemeFontProps;
    };
    bodyBold: {
      xl: IBaseThemeFontProps;
      l: IBaseThemeFontProps;
      m: IBaseThemeFontProps;
      s: IBaseThemeFontProps;
    };
    opacity: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  }

  export interface IBaseThemeSizing {
    button: {
      large: string;
    };
    input: {
      large: string;
    };
    sidebar: string;
  }

  export interface IBaseShadows {
    elevationLow: string;
    elevationMedium: string;
    elevationHigh: string;
  }
}
