import { Modal, notification } from "antd";
import { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { createUser } from "../../../../../shared/utils/services/usersServices";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Text from "../../../../../ui/Typography/Text";
import { UserCxt } from "../../UsersContext";
import { IUsersForm } from "../../types/types";
import { UsersModalResolver } from "../UsersModal.yup";
import UsersModalForm from "../UsersModalForm";

interface IUsersModalCreate {
  visible: boolean;
  setVisible: () => void;
  updateData: () => void;
}
export const UsersModalCreate = ({ visible, setVisible, updateData }: IUsersModalCreate) => {
  const { users, setUsers } = useContext(UserCxt);

  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<IUsersForm>({
    mode: "all",
    resolver: UsersModalResolver,
    defaultValues: {
      name: "",
      lastname: "",
      address: "",
      dni: "",
      email: "",
      id_rango: 1,
      password: "",
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
      const result: AxiosResponse<any, any> = await createUser(watch());

      if (result) {
        const { data } = result;
        const { success, error, user } = data;

        if (user) {
          user.key = user.id;
          setUsers([...users, user]);
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
      className="modal-user"
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
          <Text level={5}>Crear User</Text>
        </StyledTitleContainer>

        <FormProvider {...methods}>
          <UsersModalForm />
        </FormProvider>
      </Container>
    </StyledModal>
  );
};
const StyledModal = styled(Modal)`
  &.modal-user {
    .ant-modal-content {
      .ant-modal-body {
        padding: 0;
      }
    }
  }
  &.modal-user {
    width: 50% !important;
  }
`;

const StyledTitleContainer = styled(Container)`
  padding: 15px 24px;
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-transparent-1"]};
  `}
`;
