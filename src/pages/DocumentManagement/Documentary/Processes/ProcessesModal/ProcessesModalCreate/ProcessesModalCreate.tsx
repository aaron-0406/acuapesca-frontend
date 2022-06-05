import { Modal, notification } from "antd";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { createProcess } from "../../../../../../shared/utils/services/processesServices";
import Button from "../../../../../../ui/Button";
import Container from "../../../../../../ui/Container";
import Text from "../../../../../../ui/Typography/Text";
import { IProcessesForm } from "../../../types/types";
import { ProcessesModalResolver } from "../ProcessesModal.yup";
import ProcessesModalForm from "../ProcessesModalForm";

interface IProcessesModalCreate {
  visible: boolean;
  setVisible: () => void;
  updateData: () => void;
}

export const ProcessesModalCreate = ({
  visible,
  setVisible,
  updateData,
}: IProcessesModalCreate) => {
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<IProcessesForm>({
    mode: "all",
    resolver: ProcessesModalResolver,
    defaultValues: {
      name: "",
      code: "",
      status: true,
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
      const result: AxiosResponse<any, any> = await createProcess(watch());

      if (result) {
        const { data } = result;
        const { success, error, process } = data;

        if (process) {
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
      className="modal-processes"
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
          <Text level={5}>Crear proceso</Text>
        </StyledTitleContainer>

        <FormProvider {...methods}>
          <ProcessesModalForm />
        </FormProvider>
      </Container>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  &.modal-processes {
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
