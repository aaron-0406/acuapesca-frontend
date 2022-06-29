import { Modal, notification } from "antd";
import { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { getUserByID, updateUser } from "../../../../../shared/utils/services/usersServices";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Text from "../../../../../ui/Typography/Text";
import { UserCxt } from "../../UsersContext";
import { IUsersForm } from "../../types/types";
import { UsersModalResolverEdit } from "../UsersModal.yup";
import UsersModalForm from "../UsersModalForm";

interface IUsersModalUpdate {
  visible: boolean;
  setVisible: () => void;
  updateData: () => void;
  idUser: number;
}
export const UsersModalUpdate = ({ visible, setVisible, updateData, idUser }: IUsersModalUpdate) => {
  const { users, setUsers } = useContext(UserCxt);

  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<IUsersForm>({
    mode: "all",
    resolver: UsersModalResolverEdit,
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
      const result: AxiosResponse<any, any> = await updateUser(idUser, watch());

      if (result) {
        const { data } = result;
        const { success, error, user } = data;

        if (user) {
          setUsers(
            users.map((userItem) => {
              if (userItem.id === user.id) return { ...userItem, user };
              return userItem;
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
  const onGetUserById = async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getUserByID(idUser);

      if (result) {
        const { data } = result;
        const { error, user } = data;
        if (user) {
          setValue("name", user.name);
          setValue("lastname", user.lastname);
          setValue("email", user.email);
          setValue("password", user.password);
          setValue("address", user.address);
          setValue("dni", user.dni);
          setValue("id_rango", user.id_rango);
          setValue("status", user.status);
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
    if (visible) onGetUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible !== false]);

  return (
    <StyledModal
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-user"
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
          <Text level={5}>Actualizar User</Text>
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
