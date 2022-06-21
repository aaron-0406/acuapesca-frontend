import { notification, Spin } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { getDocuments } from '../../../../../../shared/utils/services/documentsServices'
import Button from '../../../../../../ui/Button'
import Container from '../../../../../../ui/Container'
import EmptyState from '../../../../../../ui/EmptyState'
import Icon from '../../../../../../ui/Icon'
import Text from '../../../../../../ui/Typography/Text'

type Docs = {
  id: number
  approval_date: string
  code: string
  effective_date: string
  file: string
  nro_pages: number
  procedure_id: number
  status: boolean
  title: string
  version: number
}

interface DataType {
  key: string
  code: string
  docs: Docs[]
}

interface IFilesTableProps {
  changeDataSelected: boolean
  procedureSelectedUUID: number
}

export const FilesTable = ({ changeDataSelected, procedureSelectedUUID }: IFilesTableProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          CÓDIGO
        </Text>
      ),
      key: 'code',
      dataIndex: 'code',
      align: 'center',
      width: '100px',
      render: (text) => (
        <Text textAlign="center" level={3} weight="bold">
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          TÍTULO
        </Text>
      ),
      key: 'title',
      render: (data) => (
        <Text textAlign="left" level={3}>
          {data.docs[0].title}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          VERSION
        </Text>
      ),
      key: 'version',
      align: 'center',
      width: '100px',
      render: (data) => (
        <Text textAlign="center" color="$color-success" level={2} weight="bold">
          {data.docs[0].version}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          FECHA DE VIGENCIA
        </Text>
      ),
      key: 'effective_date',
      align: 'center',
      width: '200px',
      render: (data) => (
        <Text textAlign="center" weight="bold" level={3}>
          {moment(data.docs[0].effective_date).format('YYYY[/]MM[/]DD')}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          ACCIÓN
        </Text>
      ),
      width: '180px',
      align: 'center',
      key: 'action',
      render: (data) => (
        <Container display="flex" justifyContent="space-around">
          <Button onClick={() => {}} icon={<Icon remixiconClass="ri-download-2-fill" />} />
          <StyledButtonMore onClick={() => {}} icon={<Icon remixiconClass="ri-more-line" />} />
        </Container>
      ),
    },
  ]

  const [loading, setLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<DataType[]>([])

  const loadTableData = useCallback(async (procedureUUID: number) => {
    try {
      setLoading(true)
      const result: AxiosResponse<any, any> = await getDocuments(procedureUUID)

      if (result) {
        const { data } = result
        const { error, documents, success } = data

        if (documents) {
          const newDocuments = documents.map((document: any) => {
            return { ...document, key: document.code }
          })
          setFiles(newDocuments)

          notification['success']({
            message: success,
          })
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
    loadTableData(procedureSelectedUUID)
  }, [changeDataSelected, loadTableData])

  if (loading) {
    return (
      <StyledLoadingContainer width="100%" display="flex" justifyContent="center" alignItems="center">
        <Spin size="large" />
      </StyledLoadingContainer>
    )
  }

  if (!files.length) {
    return (
      <Container width="100%">
        <EmptyState
          fullScreen
          title="No existen archivos"
          description="Para añadir un archivo, presiona el botón + que esta arriba"
        />
      </Container>
    )
  }

  return (
    <StyledContainer width="100%">
      <Table className="table-files" bordered pagination={false} columns={columns} dataSource={files} size="large" />
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  padding: 20px 40px;
  height: calc(100vh - 90px);
  overflow-y: auto;

  ${({ theme }) => css`
    .table-files {
      .ant-table-thead {
        tr {
          .ant-table-cell {
            background-color: ${theme.colors['$color-transparent-1']};
          }
        }
      }

      .ant-table-tbody {
        tr {
          .ant-table-cell {
            background-color: ${theme.colors['$color-transparent-4']};
          }
          td {
            border: 1px solid ${theme.colors['$color-neutral-1']};
          }
        }
        tr:hover {
          .ant-table-cell {
            background-color: ${theme.colors['$color-transparent-3']};
          }
        }
      }
    }
  `}
`

const StyledLoadingContainer = styled(Container)`
  height: calc(100% - 57px);
`

const StyledButtonMore = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors['$color-details']};
  `}
`
