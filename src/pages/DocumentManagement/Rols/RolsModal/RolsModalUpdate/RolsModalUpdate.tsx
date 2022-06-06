import { Modal, notification } from "antd";
import { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { getRolByID, updateRol } from "../../../../../shared/utils/services/rolsServices";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Text from "../../../../../ui/Typography/Text";
import { RolCxt } from "../../RolsContext";
import { IRolsForm } from "../../types/types";
import { RolsModalResolver } from "../RolsModal.yup";
import RolsModalForm from "../RolsModalForm";

interface IProcessesModalUpdate {
  visible: boolean;
  setVisible: () => void;
  updateData: () => void;
  idRol: number;
}
export const RolsModalUpdate = ({ visible, setVisible, updateData, idRol }: IProcessesModalUpdate) => {
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
      const result: AxiosResponse<any, any> = await updateRol(idRol, watch());

      if (result) {
        const { data } = result;
        const { success, error, rol } = data;

        if (rol) {
          setRols(
            rols.map((rolItem) => {
              if (rolItem.id === rol.id) return { ...rolItem, rol };
              return rolItem;
            })
          );
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
  const onGetRolById = async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getRolByID(idRol);

      if (result) {
        const { data } = result;
        const { error, rol } = data;
        if (rol) {
          setValue("code", rol.code);
          setValue("name", rol.name);
          setValue("tag_id", rol.tag_id);
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
  useEffect(() => {
    if (visible) onGetRolById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible !== false]);

  return (
    <StyledModal
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-processes"
      footer={
        <Container display="flex" justifyContent="flex-end">
          <Button type="secondary" title="Cancelar" onClick={onClose} />
          <Button type="primary" title="Actualizar" disabled={!isValid && isDirty} onClick={handleSubmit(onUpdate)} loading={loading} />
        </Container>
      }
      destroyOnClose
    >
      <Container>
        <StyledTitleContainer>
          <Text level={5}>Actualizar Rol</Text>
        </StyledTitleContainer>

        <FormProvider {...methods}>
          <RolsModalForm />
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
