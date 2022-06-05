import { Modal, notification } from "antd";
import { AxiosResponse } from "axios";
import { Controller, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import {
  createProcess,
  getProcesses,
} from "../../../../../shared/utils/services/processesServices";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Input from "../../../../../ui/Inputs/Input";
import TextArea from "../../../../../ui/Inputs/TextArea";
import Spacer from "../../../../../ui/Spacer";
import Text from "../../../../../ui/Typography/Text";
import { IProcessesForm } from "../../types/types";
import { ProcessesModalResolver } from "./ProcessesModal.yup";

interface IProcessesModal {
  visible: boolean;
  setVisible: () => void;
}

export const ProcessesModal = ({ visible, setVisible }: IProcessesModal) => {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IProcessesForm>({
    mode: "all",
    resolver: ProcessesModalResolver,
    defaultValues: {
      name: "",
      code: "",
      status: true,
    },
  });

  const onClose = () => {
    setVisible();
    reset();
  };

  const onSave = async () => {
    try {
      const result: AxiosResponse<any, any> = await createProcess(watch());

      if (result) {
        const { data } = result;
        const { success, error, process } = data;

        if (process) {
          notification["success"]({
            message: success,
          });
          onClose();
        }

        if (error) {
          notification["warn"]({
            message: error,
          });
        }
      }
    } catch (error: any) {
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
          />
        </Container>
      }
      destroyOnClose
    >
      <Container>
        <StyledTitleContainer>
          <Text level={5}>Crear proceso</Text>
        </StyledTitleContainer>
        <StyledFormContainer>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                requirement="required"
                placeholder="Ingrese código del proceso"
                label="Código:"
                hasError={!!errors.code}
                helperText={errors.code?.message}
              />
            )}
          />
          <Spacer size={30} />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextArea
                label="Título:"
                requirement="required"
                {...field}
                placeholder="Ingrese título del proceso"
              />
            )}
          />
        </StyledFormContainer>
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

const StyledFormContainer = styled(Container)`
  padding: 24px 35px;
`;
