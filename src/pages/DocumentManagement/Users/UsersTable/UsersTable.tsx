import Table, { ColumnsType } from "antd/lib/table";
import styled, { css } from "styled-components";
import Container from "../../../../ui/Container";
import Icon from "../../../../ui/Icon";
import Text from "../../../../ui/Typography/Text";
import Button from "../../../../ui/Button";
import { useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { getUsers, updateUserStatus } from "../../../../shared/utils/services/usersServices";
import { notification, Spin } from "antd";
import EmptyState from "../../../../ui/EmptyState";
import UsersModalUpdate from "../UsersModal/UsersModalUpdate";
import { UserCxt } from "../UsersContext";
import { Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  id: number;
  code: string;
  name: string;
  tag: string;
  tag_id: number;
}
interface IProcessesTableProps {
  changeData: boolean;
  setChangeData: (state: boolean) => void;
  updateData: () => void;
}

export const UsersTable = ({ changeData, setChangeData, updateData }: IProcessesTableProps) => {
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
          CARGO
        </Text>
      ),
      dataIndex: "rango",
      key: "rango",
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
        <Text level={3} textAlign="left" weight="bold">
          USUARIO
        </Text>
      ),
      dataIndex: "fullname",
      key: "fullname",
      align: "left",
      render: (text) => (
        <Text textAlign="left" level={3}>
          {text}
        </Text>
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
          <Switch
            checked={data.status}
            loading={loadingRequest}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            key={data.id}
            onChange={(e) => changeUserStatus(data.id, e)}
          />
          <StyledButtonMore onClick={() => onVisibleModalWithID(data.id)} icon={<Icon remixiconClass="ri-more-line" />} />
        </Container>
      ),
    },
  ];
  const { loading, setLoading, setLoadingRequest, loadingRequest, users, setUsers } = useContext(UserCxt);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [idUserSelected, setIdUserSelected] = useState<number>(0);

  const changeUserStatus = async (id: number, value: boolean) => {
    setLoadingRequest(true);
    try {
      const res = await updateUserStatus(id, value);
      const { data } = res;
      const { success, error } = data;
      if (success) {
        notification["success"]({ message: success });
        setUsers(
          users.map((user) => {
            if (user.id === id) return { ...user, status: value };
            return user;
          })
        );
      }
      if (error) notification["warn"]({ message: error });
    } catch (error: any) {
      notification["error"]({ message: error.message as string });
    }
    setLoadingRequest(false);
  };
  const onVisibleModalWithID = (id: number) => {
    setIdUserSelected(id);
    onToggleModal();
  };

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

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
        setChangeData(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeData]);

  if (loading) {
    return (
      <StyledLoadingContainer display="flex" justifyContent="center" alignItems="center">
        <Spin size="large" />
      </StyledLoadingContainer>
    );
  }

  if (!users.length) {
    return (
      <Container>
        <EmptyState fullScreen title="No existen roles" description="Para agregar un rol, presiona el botón + que esta arriba" />
      </Container>
    );
  }

  return (
    <StyledContainer width="100%">
      <Table className="table-processes" bordered pagination={false} columns={columns} dataSource={users} size="large" />
      <UsersModalUpdate visible={visibleModal} setVisible={onToggleModal} updateData={updateData} idUser={idUserSelected} />
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

const StyledButtonMore = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-details"]};
  `}
`;

const StyledLoadingContainer = styled(Container)`
  height: calc(100% - 57px);
`;
