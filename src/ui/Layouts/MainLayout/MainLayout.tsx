import { MenuProps, notification } from 'antd'
import jwtDecode from 'jwt-decode'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import paths from '../../../shared/routes/paths'
import { API } from '../../../shared/utils/constant/api'
import { getAuthToken, setAuthentication } from '../../../shared/utils/storage/auth'
import Button from '../../Button'
import Container from '../../Container'
import Icon from '../../Icon'
import Input from '../../Inputs/Input'
import Menu from '../../Menu'
import Spacer from '../../Spacer'
import UploadAvatar from '../../UploadAvatar'
import logo from './../../../shared/assets/images/logo.png'
import storage from '../../../shared/utils/storage'
import { useGeneralContext } from '../../../shared/contexts/StoreProvider'
import { ActionTypes } from '../../../pages/Login/actions'
import { RcFile } from 'antd/lib/upload'
import { updateUserPhoto } from '../../../shared/utils/services/usersServices'
import { Controller, useForm } from 'react-hook-form'

type MenuItem = Required<MenuProps>['items'][number]

export interface IMainLayoutForm {
  logo: RcFile | string | undefined
}

export const MainLayout = ({ children }: { children: JSX.Element }) => {
  const {
    dispatch,
    state: {
      auth: { admin },
    },
  } = useGeneralContext()

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }
  const items: MenuProps['items'] = [
    admin.tag === 'Editor'
      ? getItem(
          'ROLES',
          '1',
          <Link to={paths.documentary.roles}>
            <Icon remixiconClass="ri-shield-keyhole-fill" />
          </Link>,
        )
      : null,
    admin.tag === 'Editor'
      ? getItem(
          'USUARIOS',
          '2',
          <Link to={paths.documentary.users}>
            <Icon remixiconClass="ri-user-3-fill" />
          </Link>,
        )
      : null,
    getItem(
      'DOCUMENTOS',
      '3',
      <Link to={paths.documentary.root}>
        <Icon remixiconClass="ri-file-3-fill" />
      </Link>,
    ),
    getItem(
      'CHAT',
      '4',
      <Link to={paths.documentary.chat}>
        <Icon remixiconClass="ri-message-line" />
      </Link>,
    ),
  ]

  const navigate = useNavigate()
  const token = getAuthToken()
  const user = jwtDecode<any>(`${token}`)

  const { setValue, control } = useForm<IMainLayoutForm>({
    defaultValues: { logo: `${API}/user_photos/${user.photo}` },
  })

  const changePhoto = async (file?: RcFile) => {
    if (file) {
      try {
        const formData = new FormData()
        formData.set('photo', file)
        const { data } = await updateUserPhoto(formData)
        const { error, success, photo, token } = data
        if (success) {
          setAuthentication(token)
          dispatch({ type: ActionTypes.Login, payload: { admin: { ...admin, photo: photo } } })
          setValue('logo', `${API}/user_photos/${photo}`)
          notification['success']({ message: success })
        }
        if (error) notification['warn']({ message: error })
      } catch (error: any) {
        notification['error']({
          message: error.message as string,
        })
      }
    }
  }

  const logOut = () => {
    storage.remove('auth_token')
    storage.remove('app_state')
    dispatch({ type: ActionTypes.Logout })
    navigate(paths.guest.login)
  }

  return (
    <Container display="flex" justifyContent="space-between" width="100%">
      <StyledAsideContainer width="290px">
        <StyledContainerLogo width="100%" display="flex" alignItems="center" justifyContent="center">
          <img width="140px" alt="Logo" src={logo} />
        </StyledContainerLogo>

        <Spacer size={40} />

        <Container width="100%" display="flex" flexDirection="column" alignItems="center">
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <UploadAvatar width={190} height={190} avatar={field.value} onChange={changePhoto} hint="Subir imagen" />
            )}
          />

          <Spacer size={25} />

          <Input style={{ textAlign: 'center' }} readOnly defaultValue={`${user.name} ${user.lastname}`} />

          <Spacer size={14} />

          <Input style={{ textAlign: 'center' }} readOnly defaultValue={`${user.rango}`} />

          <Spacer size={32} />

          <Menu onClick={() => {}} width={218} mode="inline" items={items} />

          <Spacer size={32} />

          <Button
            onClick={logOut}
            $width="80%"
            title="Cerrar Sesión"
            icon={<Icon remixiconClass="ri-door-open-line" />}
          />

          <Spacer size={32} />
        </Container>
      </StyledAsideContainer>
      <StyledMainContainer width="100%">{children}</StyledMainContainer>
    </Container>
  )
}

const StyledAsideContainer = styled(Container)`
  overflow-y: scroll;
  ${({ theme }) =>
    css`
      background-color: ${theme.colors['$color-transparent-3']};
      &::-webkit-scrollbar-thumb {
        -webkit-appearance: none;
        background-color: ${theme.colors['$color-primary-2']};
        width: 5px;
        height: 5px;
      }
      &::-webkit-scrollbar {
        width: 5px;
      }
      background-color: ${theme.colors['$color-transparent-3']};
    `}
`

const StyledContainerLogo = styled(Container)`
  height: 146px;
  ${({ theme }) =>
    css`
      background-color: ${theme.colors['$color-primary-2']};
    `}
`

const StyledMainContainer = styled(Container)`
  ${({ theme }) => css`
    height: 100vh;
    border-left: 4px solid ${theme.colors['white']};
  `}
`
