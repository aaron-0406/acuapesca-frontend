import { useEffect, useState } from 'react'
import DocViewer, { DocViewerRenderers, IDocument } from '@cyntler/react-doc-viewer'
import { notification } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import styled, { css } from 'styled-components'
import { useGeneralContext } from '../../../../../../shared/contexts/StoreProvider'
import { API } from '../../../../../../shared/utils/constant/api'
import { getPhotoProcess, updatePhotoProcess } from '../../../../../../shared/utils/services/configServices'
import Button from '../../../../../../ui/Button'
import Container from '../../../../../../ui/Container'
import Text from '../../../../../../ui/Typography/Text'
interface IProcessesModalViewPhoto {
  visible: boolean
  setVisible: () => void
}
export const ProcessesModalViewPhoto = ({ visible, setVisible }: IProcessesModalViewPhoto) => {
  const [photo, setPhoto] = useState<string>('')
  const { state } = useGeneralContext()

  const docs: IDocument[] = [{ uri: `${API}/process_photo/${photo}` }]

  const onClose = () => {
    setVisible()
  }

  const onGetPhotoProcess = async () => {
    const { data } = await getPhotoProcess()
    setPhoto(data.photo)
  }

  const changePhoto = () => {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = async (_) => {
      if (inputFile.files) {
        const formData = new FormData()
        formData.set('photo_process', inputFile.files[0])
        const { data } = await updatePhotoProcess(formData)
        const { error, sucess, photo } = data
        if (sucess) {
          notification['success']({ message: sucess })
          setPhoto(photo)
        }
        if (error) notification['warn']({ message: error })
      }
    }
    inputFile.click()
  }

  useEffect(() => {
    if (visible) onGetPhotoProcess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible !== false])

  return (
    <StyledModal
      width="90%"
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-processes"
      footer={
        <Container display="flex" justifyContent="flex-end">
          {state.auth.admin.rango === 'Administrador' && (
            <Button type="primary" title="Actualizar Proceso" onClick={changePhoto} />
          )}
          <Button type="secondary" title="Cancelar" onClick={onClose} />
        </Container>
      }
      destroyOnClose
    >
      <Container display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <StyledTitleContainer>
          <Text level={5}>Foto del Proceso</Text>
        </StyledTitleContainer>
        <Container width="100%">
          <DocViewer className="doc-viewer" pluginRenderers={DocViewerRenderers} documents={docs} />
        </Container>
      </Container>
    </StyledModal>
  )
}
const StyledModal = styled(Modal)`
  &.modal-processes {
    .ant-modal-content {
      .ant-modal-body {
        padding: 0;
      }
    }

    .doc-viewer {
      div {
        div {
          div {
            a {
              display: none;
            }
          }
        }
      }
    }
  }
`
const StyledTitleContainer = styled(Container)`
  padding: 15px 24px;
  width: 100%;
  ${({ theme }) => css`
    background-color: ${theme.colors['$color-transparent-1']};
  `}
`
