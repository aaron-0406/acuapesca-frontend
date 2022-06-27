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
import Icon from '../../../../../../../ui/Icon'

interface IFilesModalEdit {
  visible: boolean
  setVisible: (fileCode: string) => void
  procedureId: number | undefined
  procedureCode: string
}

export const FilesModalEdit = ({ visible, setVisible, procedureId, procedureCode }: IFilesModalEdit) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<DataTypeFiles[]>([])

  const [filesModal, setFilesModal] = useState<IDocumentForm[]>([])

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

        return { ...user, status: false }
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
          setFilesModal(document)
          reset(document[0])

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

  const [fileNumber, setFileNumber] = useState(1)

  const onChangeFileNext = () => {
    const totalFiles = filesModal.length + 1
    if (fileNumber <= totalFiles && fileNumber < 3) {
      if (fileNumber < 2) {
        reset(filesModal[fileNumber])
        onSetAllSelectedUsers(filesModal[fileNumber].permisos)
      }

      if (fileNumber === 2) {
        reset({ code: filesModal[0].code })

        onSetAllSelectedUsers([])
      }

      setFileNumber((prev) => {
        return prev + 1
      })
    }
  }

  const onChangeFilePrevious = () => {
    if (fileNumber > 1) {
      if (fileNumber < 4) {
        reset(filesModal[fileNumber - 2])
        onSetAllSelectedUsers(filesModal[fileNumber - 2].permisos)
      }

      setFileNumber((prev) => {
        return prev - 1
      })
    }
  }

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
        <StyledTitleContainer display="flex" justifyContent="space-between">
          <Text level={5}>Editar archivo</Text>
          <Container display="flex" gap="15px">
            <Button icon={<Icon remixiconClass="ri-arrow-left-s-line" />} onClick={onChangeFilePrevious} />
            <Button type="secondary" title={`${fileNumber}`} />
            <Button icon={<Icon remixiconClass="ri-arrow-right-s-line" />} onClick={onChangeFileNext} />
          </Container>
        </StyledTitleContainer>

        <FormProvider {...methods}>
          <FilesModalForm users={users} setUsers={setUsers} editing />
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
