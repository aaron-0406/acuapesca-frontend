import Table, { ColumnsType } from "antd/lib/table";
import styled, { css } from "styled-components";
import Container from "../../../../ui/Container";
import Icon from "../../../../ui/Icon";
import Text from "../../../../ui/Typography/Text";
import Button from "../../../../ui/Button";
import { useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { getRols } from "../../../../shared/utils/services/rolsServices";
import { notification, Spin } from "antd";
import EmptyState from "../../../../ui/EmptyState";
import RolsModalUpdate from "../RolsModal/RolsModalUpdate";
import { RolCxt } from "../RolsContext";

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

export const RolsTable = ({ changeData, setChangeData, updateData }: IProcessesTableProps) => {
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
          ROL
        </Text>
      ),
      dataIndex: "name",
      key: "name",
      render: (text) => <Text level={3}>{text}</Text>,
    },
    {
      title: (
        <Text level={3} weight="bold">
          TAG
        </Text>
      ),
      dataIndex: "tag",
      key: "tag",
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
      render: (data) => (
        <Container display="flex" justifyContent="space-around">
          <StyledButtonMore onClick={() => onVisibleModalWithID(data.id)} icon={<Icon remixiconClass="ri-more-line" />} />
        </Container>
      ),
    },
  ];
  const { loading, setLoading,rols, setRols } = useContext(RolCxt);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [idRolSelected, setIdRolSelected] = useState<number>(0);

  const onVisibleModalWithID = (id: number) => {
    setIdRolSelected(id);
    onToggleModal();
  };

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const loadTableData = async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getRols();
      const { data } = result;
      const { error, rols } = data;
      if (error) {
        notification["warn"]({
          message: error,
        });
      }

      if (rols) {
        const newRols = rols.map((rol: DataType) => {
          return { ...rol, key: rol.id };
        });
        setRols(newRols);
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
  }, [changeData]);

  if (loading) {
    return (
      <StyledLoadingContainer display="flex" justifyContent="center" alignItems="center">
        <Spin size="large" />
      </StyledLoadingContainer>
    );
  }

  if (!rols.length) {
    return (
      <Container>
        <EmptyState fullScreen title="No existen roles" description="Para agregar un rol, presiona el botón + que esta arriba" />
      </Container>
    );
  }

  return (
    <StyledContainer width="100%">
      <Table className="table-processes" bordered pagination={false} columns={columns} dataSource={rols} size="large" />
      <RolsModalUpdate visible={visibleModal} setVisible={onToggleModal} updateData={updateData} idRol={idRolSelected} />
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
