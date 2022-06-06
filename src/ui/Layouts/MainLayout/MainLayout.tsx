import { MenuProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import paths from "../../../shared/routes/paths";
import Container from "../../Container";
import Icon from "../../Icon";
import Input from "../../Inputs/Input";
import Menu from "../../Menu";
import Spacer from "../../Spacer";
import UploadAvatar from "../../UploadAvatar";
import logo from "./../../../shared/assets/images/logo.png";

type MenuItem = Required<MenuProps>["items"][number];

export const MainLayout = ({ children }: { children: JSX.Element }) => {
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const items: MenuProps["items"] = [
    getItem(
      "ROLES",
      "1",
      <Link to={paths.documentary.roles}>
        <Icon remixiconClass="ri-shield-keyhole-fill" />
      </Link>
    ),
    getItem(
      "USUARIOS",
      "2",
      <Link to={paths.documentary.users}>
        <Icon remixiconClass="ri-user-3-fill" />
      </Link>
    ),
    getItem(
      "DOCUMENTOS",
      "3",
      <Link to={paths.documentary.root}>
        <Icon remixiconClass="ri-file-3-fill" />
      </Link>
    ),
  ];

  return (
    <Container display="flex" justifyContent="space-between" width="100%">
      <StyledAsideContainer width="280px">
        <StyledContainerLogo
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img width="140px" alt="logo" src={logo} />
        </StyledContainerLogo>

        <Spacer size={40} />

        <Container display="flex" flexDirection="column" alignItems="center">
          <UploadAvatar
            width={190}
            height={190}
            //avatar={value}
            onChange={() => {}}
            hint="Subir imagen"
          />

          <Spacer size={25} />

          <Input
            style={{ textAlign: "center" }}
            readOnly
            defaultValue="Pancho Rodriguez"
          />

          <Spacer size={14} />

          <Input
            style={{ textAlign: "center" }}
            readOnly
            defaultValue="Administrador"
          />

          <Spacer size={32} />

          <Menu onClick={() => {}} width={218} mode="inline" items={items} />
        </Container>
      </StyledAsideContainer>
      <StyledMainContainer width="100%">{children}</StyledMainContainer>
    </Container>
  );
};

const StyledAsideContainer = styled(Container)`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-transparent-3"]};
    `}
`;

const StyledContainerLogo = styled(Container)`
  height: 146px;
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-primary-2"]};
    `}
`;

const StyledMainContainer = styled(Container)`
  ${({ theme }) => css`
    height: 100vh;
    border-left: 4px solid ${theme.colors["white"]};
  `}
`;
