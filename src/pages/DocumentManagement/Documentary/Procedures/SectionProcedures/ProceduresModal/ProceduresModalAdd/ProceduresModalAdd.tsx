import { Modal, notification } from "antd";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { createProcedure } from "../../../../../../../shared/utils/services/proceduresServices";
import Button from "../../../../../../../ui/Button";
import Container from "../../../../../../../ui/Container";
import Text from "../../../../../../../ui/Typography/Text";
import { IProceduresForm } from "../../../../types/types";
import { ProceduresModalResolver } from "../ProceduresModal.yup";
import ProceduresModalForm from "../ProceduresModalForm";

interface IProcessesModalCreate {
  visible: boolean;
  setVisible: () => void;
  updateData: () => void;
}

export const ProceduresModalAdd = ({
  visible,
  setVisible,
  updateData,
}: IProcessesModalCreate) => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<IProceduresForm>({
    mode: "all",
    resolver: ProceduresModalResolver,
    defaultValues: {
      title: "",
      status: true,
      code: "",
      process_id: Number(id),
    },
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isValid },
  } = methods;

  const onClose = () => {
    setVisible();
    reset();
  };

  const onSave = async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await createProcedure(watch());

      if (result) {
        const { data } = result;
        const { success, error, procedure } = data;

        if (procedure) {
          notification["success"]({
            message: success,
          });
          onClose();
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
  };

  return (
    <StyledModal
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-procedures"
      footer={
        <Container display="flex" justifyContent="flex-end">
          <Button type="secondary" title="Cancelar" onClick={onClose} />
          <Button
            type="primary"
            title="Guardar"
            disabled={!isValid}
            onClick={handleSubmit(onSave)}
            loading={loading}
          />
        </Container>
      }
      destroyOnClose
    >
      <Container>
        <StyledTitleContainer>
          <Text level={5}>Crear documento</Text>
        </StyledTitleContainer>

        <FormProvider {...methods}>
          <ProceduresModalForm />
        </FormProvider>
      </Container>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  &.modal-procedures {
    .ant-modal-content {
      .ant-modal-body {
        padding: 0;
      }
    }
  }
`;

const StyledTitleContainer = styled(Container)`
  padding: 15px 24px;
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-transparent-1"]};
  `}
`;
