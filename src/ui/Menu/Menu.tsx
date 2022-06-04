import { MenuProps, Menu as AntMenu } from "antd";
import styled, { css } from "styled-components";

type StyledMenuProps = {
  width?: number;
};

type TMenuProps = MenuProps & StyledMenuProps;

export const Menu = ({ width = 176, theme, ...props }: TMenuProps) => {
  return <StyledMenu width={width} {...props} />;
};

const StyledMenu = styled(AntMenu)<StyledMenuProps>`
  ${({ theme, width }) => css`
    background-color: ${theme.colors["$color-neutral-1"]};
    color: ${theme.colors["$color-primary-1"]};
    &.ant-menu {
      width: ${width}px;

      .ant-menu-item:hover {
        background-color: ${theme.colors["$color-neutral-3"]};
        color: ${theme.colors["$color-neutral-7"]};
      }

      .ant-menu-item::after {
        border-right: 3px solid ${theme.colors["$color-primary-1"]};
      }

      .ant-menu-item-selected {
        background-color: ${theme.colors["$color-neutral-3"]};
        color: ${theme.colors["$color-neutral-7"]};
      }

      .ant-menu-item-icon {
        color: ${theme.colors["$color-primary-1"]};
      }

      .ant-menu-item-icon:hover {
        color: ${theme.colors["$color-neutral-7"]};
      }

      .ant-menu-item-selected .ant-menu-item-icon {
        color: ${theme.colors["$color-neutral-7"]};
      }
    }
  `}
`;
