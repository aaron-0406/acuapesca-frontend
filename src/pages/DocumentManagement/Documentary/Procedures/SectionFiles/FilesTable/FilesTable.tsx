import { notification, Spin } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getDocuments } from "../../../../../../shared/utils/services/documentsServices";
import Button from "../../../../../../ui/Button";
import Container from "../../../../../../ui/Container";
import EmptyState from "../../../../../../ui/EmptyState";
import Icon from "../../../../../../ui/Icon";
import Text from "../../../../../../ui/Typography/Text";

interface DataType {
  key: string;
  id?: number;
  code: string;
  version: number;
  effective_date: string;
  approval_date: string;
  title: string;
  name: string;
  nro_pages: number;
  procedure_id: number;
  file: string;
  status: boolean;
  //users: IUser[];
}

interface IFilesTableProps {
  changeDataSelected: boolean;
  updateData?: () => void;
  //setProcedureSelected: (data: IProceduresForm) => void;
}

export const FilesTable = ({
  changeDataSelected,
  updateData,
}: IFilesTableProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          CÓDIGO
        </Text>
      ),
      key: "code",
      dataIndex: "code",
      align: "center",
      width: "100px",
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
      key: "title",
      dataIndex: "title",
      render: (text) => (
        <Text textAlign="left" level={3}>
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          VERSION
        </Text>
      ),
      key: "version",
      dataIndex: "version",
      align: "center",
      width: "100px",
      render: (text) => (
        <Text textAlign="center" color="$color-success" level={2} weight="bold">
          {text}
        </Text>
      ),
    },
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          FECHA DE VIGENCIA
        </Text>
      ),
      key: "effective_date",
      dataIndex: "effective_date",
      align: "center",
      width: "200px",
      render: (text) => (
        <Text textAlign="center" weight="bold" level={3}>
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
      width: "180px",
      align: "center",
      key: "action",
      render: (data) => (
        <Container display="flex" justifyContent="space-around">
          <Button
            onClick={() => {}}
            icon={<Icon remixiconClass="ri-download-2-fill" />}
          />
          <StyledButtonMore
            onClick={() => {}}
            icon={<Icon remixiconClass="ri-more-line" />}
          />
        </Container>
      ),
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<DataType[]>([]);

  const onProcedureSelected = (data: DataType) => {
    //const { id, title, status, code, process_id } = data;
    //setProcedureSelected({ id, title, status, code, process_id });
  };

  const loadTableData = useCallback(async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getDocuments(1);

      if (result) {
        const { data } = result;
        const { error, procedures } = data;

        /* if (procedures) {
          const newProcedures = procedures.map((procedure: DataType) => {
            return { ...procedure, key: procedure.id };
          });
          setFiles(newProcedures);
          //updateData();
        } */

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
  }, []);

  useEffect(() => {
    loadTableData();
  }, [changeDataSelected, loadTableData]);

  if (loading) {
    return (
      <StyledLoadingContainer
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spin size="large" />
      </StyledLoadingContainer>
    );
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
    );
  }

  return (
    <StyledContainer width="100%">
      <Table
        className="table-files"
        bordered
        pagination={false}
        columns={columns}
        dataSource={files}
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
    .table-files {
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

const StyledLoadingContainer = styled(Container)`
  height: calc(100% - 57px);
`;

const StyledButtonMore = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-details"]};
  `}
`;
