import Table, { ColumnsType } from "antd/lib/table";
import styled, { css } from "styled-components";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
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
        <Text textAlign="center" level={4} weight="bold">
          ID
        </Text>
      ),
      dataIndex: "id",
      key: "id",
      width: "70px",
      align: "center",
    },
    {
      title: (
        <Text textAlign="center" level={4} weight="bold">
          CÓDIGO
        </Text>
      ),
      dataIndex: "code",
      key: "code",
      width: "200px",
      align: "center",
    },
    {
      title: (
        <Text level={4} weight="bold">
          PROCESO
        </Text>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <Text textAlign="center" level={4} weight="bold">
          ACCIÓN
        </Text>
      ),
      width: "200px",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Container display="flex" justifyContent="space-around">
          <StyledButtonEye icon={<Icon remixiconClass="ri-eye-off-line" />} />
          <StyledButtonMore icon={<Icon remixiconClass="ri-more-line" />} />
        </Container>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      id: 1,
      code: "P01",
      name: "GESTIÓN DE LA DIRECCIÓN",
      status: true,
    },
    {
      key: "2",
      id: 2,
      code: "P02",
      name: "Aaron Brown",
      status: true,
    },
    {
      key: "1",
      id: 1,
      code: "P01",
      name: "John Brown",
      status: true,
    },
    {
      key: "2",
      id: 2,
      code: "P02",
      name: "Aaron Brown",
      status: true,
    },
    {
      key: "1",
      id: 1,
      code: "P01",
      name: "John Brown",
      status: true,
    },
    {
      key: "2",
      id: 2,
      code: "P02",
      name: "Aaron Brown",
      status: true,
    },
    {
      key: "1",
      id: 1,
      code: "P01",
      name: "John Brown",
      status: true,
    },
    {
      key: "2",
      id: 2,
      code: "P02",
      name: "Aaron Brown",
      status: true,
    },
    {
      key: "1",
      id: 1,
      code: "P01",
      name: "John Brown",
      status: true,
    },
    {
      key: "2",
      id: 2,
      code: "P02",
      name: "Aaron Brown",
      status: true,
    },
    {
      key: "1",
      id: 1,
      code: "P01",
      name: "John Brown",
      status: true,
    },
    {
      key: "2",
      id: 2,
      code: "P02",
      name: "Aaron Brown",
      status: true,
    },
  ];

  return (
    <StyledContainer width="100%">
      <Table
        pagination={false}
        columns={columns as ColumnsType<DataType> | undefined}
        dataSource={data}
        size="large"
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 20px;
  height: calc(100vh - 90px);
  overflow-y: auto;
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
