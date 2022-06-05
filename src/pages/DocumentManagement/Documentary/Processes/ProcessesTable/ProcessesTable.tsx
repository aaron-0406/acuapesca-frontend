import { notification, Spin } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getProcesses } from "../../../../../shared/utils/services/processesServices";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import EmptyState from "../../../../../ui/EmptyState";
import Icon from "../../../../../ui/Icon";
import Text from "../../../../../ui/Typography/Text";

interface DataType {
  key: string;
  id: number;
  code: string;
  name: string;
  status: boolean;
}

export const ProcessesTable = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          ID
        </Text>
      ),
      dataIndex: "id",
      key: "id",
      width: "70px",
      align: "center",
      render: (text) => (
        <Text textAlign="center" level={3} weight="bold">
          {text}
        </Text>
      ),
    },
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
        <Text textAlign="center" level={3}>
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
      dataIndex: "name",
      key: "name",
      render: (text) => <Text level={3}>{text}</Text>,
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
      render: () => (
        <Container display="flex" justifyContent="space-around">
          <StyledButtonEye icon={<Icon remixiconClass="ri-eye-off-line" />} />
          <StyledButtonMore icon={<Icon remixiconClass="ri-more-line" />} />
        </Container>
      ),
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [processes, setProcesses] = useState<DataType[]>([]);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  if (loading) {
    return (
      <StyledLoadingContainer
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spin size="large" />
      </StyledLoadingContainer>
    );
  }

  if (!processes.length) {
    return (
      <Container>
        <EmptyState
          fullScreen
          title="No existen procesos"
          description="Para agregar un proceso, presiona el botón + que esta arriba"
        />
      </Container>
    );
  }

  return (
    <StyledContainer width="100%">
      <Table
        className="table-processes"
        bordered
        pagination={false}
        columns={columns}
        dataSource={processes}
        size="large"
      />
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

const StyledButtonEye = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-danger-5"]};
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
