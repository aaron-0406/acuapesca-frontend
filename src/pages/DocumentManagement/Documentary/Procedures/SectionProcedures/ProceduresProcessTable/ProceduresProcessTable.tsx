import { notification, Spin, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { getProcedures } from "../../../../../../shared/utils/services/proceduresServices";
import Button from "../../../../../../ui/Button";
import Container from "../../../../../../ui/Container";
import EmptyState from "../../../../../../ui/EmptyState";
import Icon from "../../../../../../ui/Icon";
import Text from "../../../../../../ui/Typography/Text";
import { IProceduresForm } from "../../../types/types";

interface DataType {
  key: string;
  id?: number;
  title: string;
  status: boolean;
  code: string;
  process_id: number;
}

interface IProcessesTableProps {
  changeData: boolean;
  updateData: () => void;
  setProcedureSelected: (data: IProceduresForm) => void;
}

export const ProceduresProcessTable = ({
  changeData,
  updateData,
  setProcedureSelected,
}: IProcessesTableProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Text textAlign="center" level={3} weight="bold">
          LISTA DE DOCUMENTOS
        </Text>
      ),
      key: "title",
      align: "center",
      render: (data) => (
        <Container
          key={data.id}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            type="link"
            title={data.title}
            leadIcon={
              <Icon
                color="$color-primary-1"
                size={30}
                remixiconClass="ri-arrow-right-s-line"
              />
            }
            onClick={() => onProcedureSelected(data as DataType)}
          />
        </Container>
      ),
    },
  ];

  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [procedures, setProcedures] = useState<DataType[]>([]);

  const onProcedureSelected = (data: DataType) => {
    const { id, title, status, code, process_id } = data;
    setProcedureSelected({ id, title, status, code, process_id });
  };

  const loadTableData = useCallback(async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getProcedures(Number(id));

      if (result) {
        const { data } = result;
        const { error, procedures } = data;

        if (procedures) {
          const newProcedures = procedures.map((procedure: DataType) => {
            return { ...procedure, key: procedure.id };
          });
          setProcedures(newProcedures);
          updateData();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadTableData();
  }, [changeData, loadTableData]);

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

  if (!procedures.length) {
    return (
      <Container>
        <EmptyState
          fullScreen
          title="No existen procedimientos"
          description="Para añadir un procedimiento, presiona el botón + que esta arriba"
        />
      </Container>
    );
  }

  return (
    <StyledContainer width="100%">
      <Table
        className="table-procedures"
        bordered
        pagination={false}
        columns={columns}
        dataSource={procedures}
        size="large"
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 0 40px;
  height: calc(100vh - 180px);
  overflow-y: auto;

  ${({ theme }) => css`
    .table-procedures {
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
            background-color: ${theme.colors["white"]};
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
