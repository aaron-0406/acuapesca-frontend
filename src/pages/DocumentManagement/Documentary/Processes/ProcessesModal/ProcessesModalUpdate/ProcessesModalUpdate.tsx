import { Modal, notification } from "antd";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import {
  getProcessByID,
  updateProcess,
} from "../../../../../../shared/utils/services/processesServices";
import Button from "../../../../../../ui/Button";
import Container from "../../../../../../ui/Container";
import Text from "../../../../../../ui/Typography/Text";
import { IProcessesForm } from "../../../types/types";
import { ProcessesModalResolver } from "../ProcessesModal.yup";
import ProcessesModalForm from "../ProcessesModalForm";

interface IProcessesModalUpdate {
  visible: boolean;
  setVisible: () => void;
  updateData: () => void;
  idProcess: number;
}

export const ProcessesModalUpdate = ({
  visible,
  setVisible,
  updateData,
  idProcess,
}: IProcessesModalUpdate) => {
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
    setValue,
    formState: { isValid, isDirty },
  } = methods;

  const onClose = () => {
    setVisible();
    reset();
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await updateProcess(
        idProcess,
        watch()
      );

      if (result) {
        const { data } = result;
        const { success, error, proceso } = data;

        if (proceso) {
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

  const onGetProcessById = useCallback(async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getProcessByID(idProcess);

      if (result) {
        const { data } = result;
        const { error, process } = data;

        if (process) {
          setValue("code", process.code);
          setValue("name", process.name);
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
  }, [idProcess, setValue]);

  useEffect(() => {
    if (visible) onGetProcessById();
  }, [visible !== false, onGetProcessById]);

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
            title="Actualizar"
            disabled={!isValid && isDirty}
            onClick={handleSubmit(onUpdate)}
            loading={loading}
          />
        </Container>
      }
      destroyOnClose
    >
      <Container>
        <StyledTitleContainer>
          <Text level={5}>Actualizar proceso</Text>
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
