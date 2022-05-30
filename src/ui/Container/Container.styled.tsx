import React, { LegacyRef } from "react";
import CSS from "csstype";
import styled, { css } from "styled-components";

type DivProps = React.ComponentProps<"div">;

export interface ContainerProps extends Omit<DivProps, "ref"> {
  display?: CSS.Property.Display;
  alignItems?: CSS.Property.AlignItems;
  justifyContent?: CSS.Property.JustifyContent;
  textAlign?: CSS.Property.TextAlign;
  position?: CSS.Property.Position;
  centered?: boolean | number;
  fullScreen?: boolean;
  reference?: LegacyRef<HTMLDivElement> | undefined;
  minHeight?: CSS.Property.MinHeight;
  minWidth?: CSS.Property.MinWidth;
  maxHeight?: CSS.Property.MaxHeight;
  maxWidth?: CSS.Property.MaxWidth;
  width?: CSS.Property.Width;
  flexDirection?: CSS.Property.FlexDirection;
  flexWrap?: CSS.Property.FlexWrap;
  gap?: CSS.Property.Gap;
  readonly?: boolean;
}

export const StyledContainer = styled.div<ContainerProps>`
  ${({ centered, fullScreen }) =>
    centered
      ? css`
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          ${!!fullScreen &&
          css`
            min-height: 70vh;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `}
        `
      : css`
          width: inherit;
        `}

  ${({ readonly }) => css`
    pointer-events: ${readonly ? "none" : "auto"};
    opacity: ${readonly ? 0.5 : 1};
  `}

  ${({ display }) =>
    !!display &&
    css`
      display: ${display};
    `}

  ${({ alignItems }) =>
    !!alignItems &&
    css`
      align-items: ${alignItems};
    `}

  ${({ justifyContent }) =>
    !!justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}

  ${({ textAlign }) =>
    !!textAlign &&
    css`
      text-align: ${textAlign};
    `}
    
  ${({ position }) =>
    !!position &&
    css`
      position: ${position};
    `}

  ${({ minHeight }) =>
    !!minHeight &&
    css`
      min-height: ${minHeight};
    `}

    ${({ minWidth }) =>
    !!minWidth &&
    css`
      min-width: ${minWidth};
    `}

    ${({ maxHeight }) =>
    !!maxHeight &&
    css`
      max-height: ${maxHeight};
    `}

    ${({ maxWidth }) =>
    !!maxWidth &&
    css`
      max-width: ${maxWidth};
    `}

  ${({ flexDirection }) =>
    !!flexDirection &&
    css`
      flex-direction: ${flexDirection};
    `}

    ${({ flexWrap }) =>
    !!flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `}
      
  ${({ gap }) =>
    !!gap &&
    css`
      gap: ${gap};
    `}

    ${({ width }) =>
    !!width &&
    css`
      width: ${width};
    `}
`;
