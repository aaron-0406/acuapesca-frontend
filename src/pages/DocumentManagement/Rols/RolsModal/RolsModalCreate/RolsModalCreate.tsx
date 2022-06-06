import { Modal, notification } from "antd";
import { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { createRol } from "../../../../../shared/utils/services/rolsServices";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Text from "../../../../../ui/Typography/Text";
import { RolCxt } from "../../RolsContext";
import { IRolsForm } from "../../types/types";
import { RolsModalResolver } from "../RolsModal.yup";
import RolsModalForm from "../RolsModalForm";

interface IRolsModalCreate {
  visible: boolean;
  setVisible: () => void;
  updateData: () => void;
}
export const RolsModalCreate = ({ visible, setVisible, updateData }: IRolsModalCreate) => {
  const { rols, setRols } = useContext(RolCxt);

  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<IRolsForm>({
    mode: "all",
    resolver: RolsModalResolver,
    defaultValues: {
      name: "",
      code: "",
      tag_id: 1,
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
      const result: AxiosResponse<any, any> = await createRol(watch());

      if (result) {
        const { data } = result;
        const { success, error, rol } = data;

        if (rol) {
          rol.key = rol.id;
          setRols([...rols, rol]);
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
      className="modal-rol"
      footer={
        <Container display="flex" justifyContent="flex-end">
          <Button type="secondary" title="Cancelar" onClick={onClose} />
          <Button type="primary" title="Guardar" disabled={!isValid} onClick={handleSubmit(onSave)} loading={loading} />
        </Container>
      }
      destroyOnClose
    >
      <Container>
        <StyledTitleContainer>
          <Text level={5}>Crear Rol</Text>
        </StyledTitleContainer>

        <FormProvider {...methods}>
          <RolsModalForm />
        </FormProvider>
      </Container>
    </StyledModal>
  );
};
const StyledModal = styled(Modal)`
  &.modal-rol {
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
