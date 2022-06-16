import Table, { ColumnsType } from "antd/lib/table";
import Container from "../../../../../../../../ui/Container";
import Switch from "../../../../../../../../ui/Switch";
import Text from "../../../../../../../../ui/Typography/Text";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { AxiosResponse } from "axios";
import { getUsers } from "../../../../../../../../shared/utils/services/usersServices";
import { notification, Spin } from "antd";
import { useEffect, useState } from "react";
import EmptyState from "../../../../../../../../ui/EmptyState";
import styled, { css } from "styled-components";

interface DataType {
  key: string;
  id: number;
  code: string;
  name: string;
  tag: string;
  tag_id: number;
}

export const FilesTable = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text textAlign="center" level={4} weight="bold">
          ID
        </Text>
      ),
      dataIndex: "id",
      key: "id",
      width: "50px",
      align: "center",
      render: (text) => (
        <Text textAlign="center" level={4} weight="bold">
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={4} weight="bold">
          CARGO
        </Text>
      ),
      dataIndex: "rango",
      key: "rango",
      width: "150px",
      align: "center",
      render: (text) => (
        <Text textAlign="center" level={4}>
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text level={4} textAlign="left" weight="bold">
          USUARIO
        </Text>
      ),
      dataIndex: "fullname",
      key: "fullname",
      align: "left",
      render: (text) => (
        <Text textAlign="left" level={4}>
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={4} weight="bold">
          ACCIÓN
        </Text>
      ),
      width: "100px",
      align: "center",
      key: "action",
      render: (data) => (
        <Container display="flex" justifyContent="space-around">
          <Switch
            checked={data.status}
            //loading={loadingRequest}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            key={data.id}
            onChange={(e) => {}}
          />
        </Container>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<DataType[]>([]);

  const loadTableData = async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getUsers();
      const { data } = result;
      const { error, users } = data;
      if (error) {
        notification["warn"]({
          message: error,
        });
      }

      if (users) {
        const newUsers = users.map((rol: DataType) => {
          return { ...rol, key: rol.id };
        });
        setUsers(newUsers);
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
    console.log({ xd: "xd" });
    loadTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (!users.length) {
    return (
      <Container>
        <EmptyState
          fullScreen
          title="No existen roles"
          description="Para agregar un rol, presiona el botón + que esta arriba"
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
        dataSource={users}
        size="large"
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  height: calc(100vh - 670px);
  overflow-y: auto;

  ${({ theme }) => css`
    .table-processes {
      .ant-table-thead {
        tr {
          .ant-table-cell {
            padding: 7px 10px;
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
            padding: 5px 10px;
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

const StyledLoadingContainer = styled(Container)`
  height: calc(100% - 57px);
`;
