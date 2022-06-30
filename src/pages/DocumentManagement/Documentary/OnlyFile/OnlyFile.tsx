import DocViewer, { DocViewerRenderers, IDocument } from '@cyntler/react-doc-viewer'
import { notification } from 'antd'
import { AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import paths from '../../../../shared/routes/paths'
import { API } from '../../../../shared/utils/constant/api'
import { getDocumentByID } from '../../../../shared/utils/services/documentsServices'
import Button from '../../../../ui/Button'
import Container from '../../../../ui/Container'
import HeaderPlus from '../../../../ui/Header/HeaderPlus'
import Icon from '../../../../ui/Icon'

export const OnlyFile = () => {
  const [loading, setLoading] = useState(false)
  const [idProcess, setIdProcess] = useState('')
  const [docs, setdocs] = useState<IDocument[]>([])

  const { id } = useParams()
  const navigate = useNavigate()

  const loadFileData = useCallback(
    async (id: string | undefined) => {
      try {
        setLoading(true)
        const result: AxiosResponse<any, any> = await getDocumentByID(id ? id : '')

        if (result) {
          const { data } = result
          const { error, document } = data

          if (document) {
            setdocs([{ uri: `${API}/docs/${document.file}` }])
            setIdProcess(document.process_id)
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
    },
    [setdocs],
  )

  useEffect(() => {
    loadFileData(id)
  }, [loadFileData])

  return (
    <StyledContainer>
      <HeaderPlus
        title=""
        plusHeader={
          <Button
            icon={
              <Icon
                size={28}
                remixiconClass="ri-arrow-left-fill"
                onClick={() => {
                  navigate(paths.documentary.verProcedimientos(idProcess))
                }}
              />
            }
          />
        }
        disabledButton={false}
      />
      <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
`
