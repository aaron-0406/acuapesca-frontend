import React from 'react'
import { Result } from 'antd'
import Button from '../../ui/Button'
import Container from '../../ui/Container'
import { useNavigate } from 'react-router-dom'
import paths from '../../shared/routes/paths'

export const NotFound = () => {
  const navigate = useNavigate()

  const redirect = () => {
    navigate(paths.guest.login)
  }

  return (
    <Container width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Result status="404" title="404" subTitle="Lo siento, la página que visitaste no existe." />
      <Button type="primary" title="Regresar a Home" onClick={redirect} />
    </Container>
  )
}
