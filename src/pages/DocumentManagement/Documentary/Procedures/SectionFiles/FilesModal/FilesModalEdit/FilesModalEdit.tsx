import { useCallback, useEffect, useState } from 'react'
import { Modal, notification } from 'antd'
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

interface IFilesModalEdit {
  visible: boolean
  setVisible: () => void
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

  const onEdit = () => {}

  const loadDataFiles = useCallback(async (procedureCode: string, procedureId: number | undefined) => {
    try {
      setLoading(true)
      const result: AxiosResponse<any, any> = await getDocumentByCode(procedureCode, procedureId ? procedureId : 0)

      if (result) {
        const { data } = result
        console.log('🚀 ~ file: FilesModalEdit.tsx ~ line 65 ~ loadDataFiles ~ data', data)
        /* const { error, documents } = data

        if (documents) {
          const newDocuments = documents.map((document: any) => {
            return { ...document, key: document.code }
          })
          setFiles(newDocuments)
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
