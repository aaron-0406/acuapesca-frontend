import DocViewer, { DocViewerRenderers, IDocument } from '@cyntler/react-doc-viewer'
import { Modal } from 'antd'
import styled from 'styled-components'
import { API } from '../../../../../../../../shared/utils/constant/api'
import Container from '../../../../../../../../ui/Container'

interface IFilesDocViewer {
  fileName: string
  visible: boolean
  onClose: () => void
}

export const FilesDocViewer = ({ fileName, visible, onClose }: IFilesDocViewer) => {
  const docs: IDocument[] = [{ uri: `${API}/docs/${fileName}` }]

  return (
    <StyledModal
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-files-doc-viewer"
      onOk={onClose}
      destroyOnClose
    >
      <Container>
        <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
      </Container>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  &.modal-files-doc-viewer {
    .ant-modal-content {
      .ant-modal-body {
        padding: 0;
      }
    }
  }

  &.modal-files-doc-viewer {
    width: 80% !important;
  }
`
