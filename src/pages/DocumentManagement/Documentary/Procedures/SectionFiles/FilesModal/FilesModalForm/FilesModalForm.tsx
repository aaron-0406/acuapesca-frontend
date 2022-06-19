import { useState } from 'react'
import { DatePicker } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import Container from '../../../../../../../ui/Container'
import InputLabel from '../../../../../../../ui/InputLabel'
import Input from '../../../../../../../ui/Inputs/Input'
import Spacer from '../../../../../../../ui/Spacer'
import Switch from '../../../../../../../ui/Switch'
import { IDocumentForm } from '../../../../types/types'
import FilesCheckableTag from './FilesCheckableTag'
import FilesTable from './FilesTable'
import FilesUpload from './FilesUpload'
import { DataTypeFiles } from './FilesTable/FilesTable'
import { IRolsForm } from '../../../../../Rols/types/types'

interface IFilesModalForm {
  users: DataTypeFiles[]
  setUsers: React.Dispatch<React.SetStateAction<DataTypeFiles[]>>
}

export const FilesModalForm = ({ users, setUsers }: IFilesModalForm) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IDocumentForm>()

  const onCheckAllSelectedTags = (tag: IRolsForm, checked: boolean) => {
    setUsers(
      users.map((user) => {
        if (tag.id === user.id_rango) {
          return { ...user, status: checked }
        }
        return user
      }),
    )
  }

  return (
    <StyledFormContainer display="flex" width="100%" gap="30px">
      <Container width="50%">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              requirement="required"
              placeholder="Ingrese el código del documento"
              label="Código:"
              hasError={!!errors.code}
              helperText={errors.code?.message}
            />
          )}
        />
        <Spacer size={30} />
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              requirement="required"
              placeholder="Ingrese el título del documento"
              label="Título:"
              hasError={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Spacer size={30} />
        <Controller
          name="version"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              requirement="required"
              placeholder="Ingrese la versión del documento"
              label="Versión:"
              hasError={!!errors.version}
              helperText={errors.version?.message}
            />
          )}
        />
        <Spacer size={30} />
        <Container display="flex" flexDirection="column" width="100%" justifyContent="space-between">
          <InputLabel label="Fecha de vigencia:" requirement="required" disabled={false} />
          <Controller
            name="effective_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Seleccione la fecha de vigencia"
                onChange={field.onChange}
              />
            )}
          />

          <Spacer size={30} />

          <InputLabel label="Fecha de aprobación:" requirement="required" disabled={false} />
          <Controller
            name="approval_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Seleccione la fecha de aprobación"
                onChange={field.onChange}
              />
            )}
          />
        </Container>
        <Spacer size={30} />
        <Container display="flex" width="100%" justifyContent="space-between">
          <InputLabel label="Disponibilidad" requirement="required" disabled={false} />
          <Controller
            name="status"
            control={control}
            render={({ field }) => <Switch onChange={field.onChange} checked={field.value} />}
          />
        </Container>
      </Container>

      <Container width="50%">
        <Container display="flex" flexDirection="column" width="100%" justifyContent="space-between">
          <FilesUpload />
        </Container>

        <Spacer size={30} />

        <Container width="100%">
          <InputLabel label="Alcance de usuarios:" requirement="required" disabled={false} />

          <FilesCheckableTag checkAllSelectedTags={onCheckAllSelectedTags} />

          <FilesTable users={users} setUsers={setUsers} />
        </Container>
      </Container>
    </StyledFormContainer>
  )
}

const StyledFormContainer = styled(Container)`
  padding: 24px 35px;
`
