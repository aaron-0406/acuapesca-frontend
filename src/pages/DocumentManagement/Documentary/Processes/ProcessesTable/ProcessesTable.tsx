import { notification, Spin } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import paths from "../../../../../shared/routes/paths";
import { changeProcessStatus, getProcesses } from "../../../../../shared/utils/services/processesServices";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import EmptyState from "../../../../../ui/EmptyState";
import Icon from "../../../../../ui/Icon";
import Text from "../../../../../ui/Typography/Text";
import ProcessesModalUpdate from "../ProcessesModal/ProcessesModalUpdate";

interface DataType {
  key: string;
  id: number;
  code: string;
  name: string;
  status: boolean;
}

interface IProcessesTableProps {
  changeData: boolean;
  setChangeData: (state: boolean) => void;
  updateData: () => void;
}

export const ProcessesTable = ({ changeData, setChangeData, updateData }: IProcessesTableProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          CÓDIGO
        </Text>
      ),
      dataIndex: "code",
      key: "code",
      width: "200px",
      align: "center",
      render: (text) => (
        <Text textAlign="center" level={3} weight="bold">
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text level={3} weight="bold">
          PROCESO
        </Text>
      ),
      key: "name",
      render: (data) => (
        <Link to={paths.documentary.verProcedimientos(data.id)}>
          <StyledTextLink level={3}>{data.name}</StyledTextLink>
        </Link>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          ACCIÓN
        </Text>
      ),
      width: "200px",
      align: "center",
      key: "action",
      render: (data) => (
        <Container display="flex" justifyContent="space-around">
          {data.status ? (
            <StyledButtonEyeTrue onClick={() => onChangeProcessStatus(data.id, data.status)} icon={<Icon remixiconClass="ri-eye-off-fill" />} />
          ) : (
            <StyledButtonEyeFalse onClick={() => onChangeProcessStatus(data.id, data.status)} icon={<Icon remixiconClass="ri-eye-fill" />} />
          )}

          <StyledButtonMore onClick={() => onVisibleModalWithID(data.id)} icon={<Icon remixiconClass="ri-more-line" />} />
        </Container>
      ),
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [processes, setProcesses] = useState<DataType[]>([]);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [idProcessSelected, setIdProcessSelected] = useState<number>(0);

  const onVisibleModalWithID = (id: number) => {
    setIdProcessSelected(id);
    onToggleModal();
  };

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onChangeProcessStatus = async (id: number, status: boolean) => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await changeProcessStatus(id, !status);

      if (result) {
        const { data } = result;
        const { success, error } = data;

        if (success) {
          setProcesses(
            processes.map((process) => {
              if (process.id === id) return { ...process, status: !status };
              return process;
            })
          );
          notification["success"]({
            message: success,
          });
        }

        if (error) {
          notification["warn"]({
            message: error,
          });
        }
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notification["error"]({
        message: error.message as string,
      });
    }
  };

  const loadTableData = async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getProcesses();

      if (result) {
        const { data } = result;
        const { error, procesos } = data;

        if (procesos) {
          const newProcesses = procesos.map((process: DataType) => {
            return { ...process, key: process.id };
          });
          setProcesses(newProcesses);
          setChangeData(false);
        }

        if (error) {
          notification["warn"]({
            message: error,
          });
        }
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notification["error"]({
        message: error.message as string,
      });
    }
  };

  useEffect(() => {
    loadTableData();
  }, [changeData]);

  if (loading) {
    return (
      <StyledLoadingContainer display="flex" justifyContent="center" alignItems="center">
        <Spin size="large" />
      </StyledLoadingContainer>
    );
  }

  if (!processes.length) {
    return (
      <Container>
        <EmptyState fullScreen title="No existen procesos" description="Para agregar un proceso, presiona el botón + que esta arriba" />
      </Container>
    );
  }

  return (
    <StyledContainer width="100%">
      <Table className="table-processes" bordered pagination={false} columns={columns} dataSource={processes} size="large" />
      <ProcessesModalUpdate visible={visibleModal} setVisible={onToggleModal} updateData={updateData} idProcess={idProcessSelected} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 20px 40px;
  height: calc(100vh - 90px);
  overflow-y: auto;

  ${({ theme }) => css`
    .table-processes {
      .ant-table-thead {
        tr {
          .ant-table-cell {
            background-color: ${theme.colors["$color-transparent-1"]};
          }
        }
      }

      .ant-table-tbody {
        tr {
          .ant-table-cell {
            background-color: ${theme.colors["$color-transparent-4"]};
          }
          td {
            border: 1px solid ${theme.colors["$color-neutral-1"]};
          }
        }
        tr:hover {
          .ant-table-cell {
            background-color: ${theme.colors["$color-transparent-3"]};
          }
        }
      }
    }
  `}
`;

const StyledButtonEyeTrue = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-danger-5"]};
  `}
`;

const StyledButtonEyeFalse = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-success-5"]};
  `}
`;

const StyledButtonMore = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-details"]};
  `}
`;

const StyledLoadingContainer = styled(Container)`
  height: calc(100% - 57px);
`;

const StyledTextLink = styled(Text)`
  ${({ theme }) => css`
    &:hover {
      color: ${theme.colors["$color-primary-1"]};
    }
  `}
`;
