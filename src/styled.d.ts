// import original module declarations
import "styled-components";

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
    "$color-letter": string;
    "$color-button-content": string;
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
