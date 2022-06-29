import { Modal, Spin, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { getLogsService } from '../../../../shared/utils/services/logServices'
import Button from '../../../../ui/Button'
import Container from '../../../../ui/Container'
import Text from '../../../../ui/Typography/Text'
import moment from 'moment'

interface IUsersModaLog {
  visible: boolean
  setVisible: () => void
  idUser: number
}
interface DataType {
  key: string
  id: number
  title: string
  date: string
}
export const ModalLog = ({ visible, setVisible, idUser }: IUsersModaLog) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [logs, setLogs] = useState<DataType[]>([])
  const onClose = () => {
    setLoading(false)
    setVisible()
  }
  const getLogs = async () => {
    try {
      const res = await getLogsService(idUser)
      setLoading(true)
      const { data } = res
      const { success, error, log } = data
      if (success && log) {
        const newLogs = log.map((log: DataType) => {
          return { ...log, key: log.id }
        })
        setLogs(newLogs)
      }
      if (error) setLogs([])
    } catch (error) {
      setLogs([])
    }
    setLoading(false)
  }
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          ID
        </Text>
      ),
      dataIndex: 'id',
      key: 'id',
      width: '70px',
      align: 'center',
      render: (text) => (
        <Text textAlign="center" level={3} weight="bold">
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          Titulo del documento Documento
        </Text>
      ),
      dataIndex: 'title',
      key: 'title',
      width: '70px',
      align: 'center',
      render: (text) => (
        <Text textAlign="center" level={3} weight="bold">
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          Fecha de Visualización
        </Text>
      ),
      dataIndex: 'date',
      key: 'date',
      width: '200px',
      align: 'center',
      render: (text) => (
        <Text textAlign="center" level={3}>
          {moment(text).format('DD[/]MM[/]YYYY hh[:]mm[:]ss')}
        </Text>
      ),
    },
  ]
  useEffect(() => {
    if (visible) getLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible !== false])
  return (
    <StyledModal
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-user"
      footer={
        <Container display="flex" justifyContent="flex-end">
          <Button type="secondary" title="Cancelar" onClick={onClose} />
        </Container>
      }
      destroyOnClose
    >
      <Container minHeight={'400px'}>
        <StyledTitleContainer>
          <Text level={5}>Historial de vistas</Text>
        </StyledTitleContainer>
        {!loading && (
          <Table
            className="table-processes"
            bordered
            pagination={false}
            columns={columns}
            dataSource={logs}
            size="large"
          />
        )}
        {loading && (
          <StyledLoadingContainer display="flex" justifyContent="center" alignItems="center">
            <Spin size="large" />
          </StyledLoadingContainer>
        )}
      </Container>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  &.modal-user {
    .ant-modal-content {
      .ant-modal-body {
        padding: 0;
      }
    }
  }
  &.modal-user {
    width: 50% !important;
  }
`
const StyledTitleContainer = styled(Container)`
  padding: 15px 24px;
  ${({ theme }) => css`
    background-color: ${theme.colors['$color-transparent-1']};
  `}
`
const StyledLoadingContainer = styled(Container)`
  height: 300px;
`
