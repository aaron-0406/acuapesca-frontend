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
import moment from 'moment'
import { useFilesContext } from '../../../../../../../shared/contexts/FilesProvider'

interface IFilesModalCreate {
  visible: boolean
  setVisible: () => void
  procedureId: number | undefined
}

export const FilesModalAdd = ({ visible, setVisible, procedureId }: IFilesModalCreate) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<DataTypeFiles[]>([])

  const { setFiles } = useFilesContext()

  const methods = useForm<IDocumentForm>({
    mode: 'all',
    resolver: FilesModalResolver,
    defaultValues: {
      code: '',
      version: 0,
      effective_date: '',
      approval_date: '',
      title: '',
      nro_pages: 0,
      status: false,
      procedure_id: 0,
    },
  })

  const {
    reset,
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

      const data = new FormData()
      data.append('title', getValues('title'))
      data.append('version', `${getValues('version')}`)
      data.append('code', getValues('code'))
      data.append('effective_date', moment(getValues('effective_date')).format('YYYY[/]MM[/]DD'))
      data.append('approval_date', moment(getValues('approval_date')).format('YYYY[/]MM[/]DD'))
      data.append('nro_pages', `${getValues('nro_pages')}`)
      data.append('procedure_id', `${getValues('procedure_id')}`)
      data.append('status', `${getValues('status')}`)
      data.append('file', getValues('file'))
      data.append('permisos', `[${getValues('permisos')}]`)

      const result: AxiosResponse<any, any> = await createDocument(data)

      if (result) {
        const { data } = result
        const { success, error, document } = data

        if (document && success) {
          setFiles((prev) => {
            let find = false

            const updateFiles = prev.map((file) => {
              if (file.code === document.code) {
                find = true
                return { ...file, docs: [...file.docs, document] }
              }

              return file
            })

            if (find) return updateFiles

            return [
              ...prev,
              {
                key: document.code,
                code: document.code,
                docs: [document],
              },
            ]
          })

          notification['success']({
            message: success,
          })
          onClose()
        }

        if (error) {
          notification['warn']({
            message: error,
          })
        }
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
          <Button type="secondary" title="Cancelar" onClick={onClose} disabled={loading} />
          <Button type="primary" title="Guardar" disabled={!isValid} onClick={onSave} loading={loading} />
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
