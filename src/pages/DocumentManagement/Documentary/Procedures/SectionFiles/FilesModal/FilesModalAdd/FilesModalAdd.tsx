import { useState } from 'react'
import { Modal, notification } from 'antd'
import styled, { css } from 'styled-components'
import Button from '../../../../../../../ui/Button'
import Container from '../../../../../../../ui/Container'
import { FormProvider, useForm } from 'react-hook-form'
import { IDocumentForm } from '../../../../types/types'
import { FilesModalResolver } from '../FilesModal.yup'
import Text from '../../../../../../../ui/Typography/Text'
import FilesModalForm from '../FilesModalForm'
import { AxiosResponse } from 'axios'
import { createDocument } from '../../../../../../../shared/utils/services/documentsServices'
import { DataTypeFiles } from '../FilesModalForm/FilesTable/FilesTable'

interface IFilesModalCreate {
  visible: boolean
  setVisible: () => void
  updateData?: () => void
  procedureId: number | undefined
}

export const FilesModalAdd = ({ visible, setVisible, procedureId }: IFilesModalCreate) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<DataTypeFiles[]>([])

  const methods = useForm<IDocumentForm>({
    mode: 'all',
    resolver: FilesModalResolver,
    defaultValues: {
      code: '',
      version: 0,
      effective_date: '',
      approval_date: '',
      title: '',
      name: 'PDF',
      nro_pages: 0,
      status: false,
      procedure_id: 0,
    },
  })

  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid },
    setValue,
  } = methods

  const onClose = () => {
    setVisible()
    reset()
  }

  const onGetAllIdsUsers = () => {
    const id: number[] = []
    users.forEach((user) => {
      if (user.status === true) return id.push(user.id)
    })

    setValue('permisos', id)
  }

  const onSave = async () => {
    try {
      setValue('procedure_id', procedureId ? procedureId : 0)
      onGetAllIdsUsers()

      setLoading(true)

      console.log(getValues())

      const data = new FormData()
      data.append('title', getValues('title'))
      data.append('version', getValues('version').toString())
      data.append('code', getValues('code'))
      data.append('effective_date', getValues('effective_date'))
      data.append('approval_date', getValues('approval_date'))
      data.append('name', getValues('name'))
      data.append('nro_pages', getValues('nro_pages').toString())
      data.append('procedure_id', getValues('procedure_id').toString())
      data.append('status', getValues('status').toString())
      data.append('file', getValues('file'))
      data.append('permisos', getValues('permisos').toString())

      const result: AxiosResponse<any, any> = await createDocument(data)

      if (result) {
        const { data } = result
        console.log({ data: data })
        /* const { success, error, process } = data

        if (process) {
          notification['success']({
            message: success,
          })
          onClose()
          //updateData();
        }

        if (error) {
          notification['warn']({
            message: error,
          })
        } */
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      notification['error']({
        message: error.message as string,
      })
    }
  }

  return (
    <StyledModal
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-files"
      footer={
        <Container display="flex" justifyContent="flex-end">
          <Button type="secondary" title="Cancelar" onClick={onClose} />
          <Button type="primary" title="Guardar" disabled={!isValid} onClick={handleSubmit(onSave)} loading={loading} />
        </Container>
      }
      destroyOnClose
    >
      <Container>
        <StyledTitleContainer>
          <Text level={5}>Crear archivo</Text>
        </StyledTitleContainer>

        <FormProvider {...methods}>
          <FilesModalForm users={users} setUsers={setUsers} />
        </FormProvider>
      </Container>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  &.modal-files {
    .ant-modal-content {
      .ant-modal-body {
        padding: 0;
      }
    }
  }

  &.modal-files {
    width: 1000px !important;
  }
`

const StyledTitleContainer = styled(Container)`
  padding: 15px 24px;
  ${({ theme }) => css`
    background-color: ${theme.colors['$color-transparent-1']};
  `}
`
