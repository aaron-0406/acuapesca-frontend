import { Modal, notification } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { useFilesContext } from '../../../../../../../shared/contexts/FilesProvider'
import Button from '../../../../../../../ui/Button'
import Container from '../../../../../../../ui/Container'
import Text from '../../../../../../../ui/Typography/Text'
import { IDocumentForm } from '../../../../types/types'
import { FilesModalResolver } from '../FilesModal.yup'
import FilesModalForm from '../FilesModalForm'
import { DataTypeFiles } from '../FilesModalForm/FilesTable/FilesTable'
import { AxiosResponse } from 'axios'
import { getDocumentByCode } from '../../../../../../../shared/utils/services/documentsServices'
import moment from 'moment'

interface IFilesModalEdit {
  visible: boolean
  setVisible: (fileCode: string) => void
  procedureId: number | undefined
  procedureCode: string
}

export const FilesModalEdit = ({ visible, setVisible, procedureId, procedureCode }: IFilesModalEdit) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<DataTypeFiles[]>([])

  const { files, setFiles } = useFilesContext()

  const methods = useForm<IDocumentForm>({
    mode: 'all',
    resolver: FilesModalResolver,
  })

  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid },
    setValue,
  } = methods

  const onClose = () => {
    setVisible('')
    reset()
  }

  const onGetAllIdsUsers = () => {
    const idsUsers: number[] = []
    users.forEach((user) => {
      if (user.status === true) return idsUsers.push(user.id)
    })

    setValue('permisos', idsUsers)
  }

  const onSetAllSelectedUsers = (ids: number[]) => {
    setUsers((prev) => {
      const newUsers = prev.map((user) => {
        if (ids.find((idUser) => idUser === user.id)) {
          return { ...user, status: true }
        }

        return user
      })

      return newUsers
    })
  }

  const onEdit = () => {}

  const loadDataFiles = useCallback(async (procedureCode: string, procedureId: number | undefined) => {
    try {
      setLoading(true)
      const result: AxiosResponse<any, any> = await getDocumentByCode(procedureCode, procedureId ? procedureId : 0)

      if (result) {
        const { data } = result
        const { error, document } = data

        if (document) {
          setValue('id', document[0].id)
          setValue('code', document[0].code)
          setValue('title', document[0].title)
          setValue('version', document[0].version)
          setValue('effective_date', document[0].effective_date)
          setValue('approval_date', document[0].approval_date)
          setValue('title', document[0].title)
          setValue('nro_pages', document[0].nro_pages)
          setValue('procedure_id', document[0].procedure_id)
          setValue('file', document[0].file)
          setValue('status', document[0].status)
          setValue('permisos', document[0].permisos)

          if (users) {
            onSetAllSelectedUsers(document[0] ? document[0].permisos : [])
          }
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
  }, [])

  useEffect(() => {
    loadDataFiles(procedureCode, procedureId)
  }, [procedureId])

  return (
    <StyledModal
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-files"
      footer={
        <Container display="flex" justifyContent="flex-end">
          <Button type="secondary" title="Cancelar" onClick={onClose} />
          <Button type="primary" title="Guardar" disabled={!isValid} onClick={handleSubmit(onEdit)} loading={loading} />
        </Container>
      }
      destroyOnClose
    >
      <Container>
        <StyledTitleContainer>
          <Text level={5}>Editar archivo</Text>
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
