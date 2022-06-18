import { useState } from "react";
import { Modal } from "antd";
import styled, { css } from "styled-components";
import Button from "../../../../../../../ui/Button";
import Container from "../../../../../../../ui/Container";
import { FormProvider, useForm } from "react-hook-form";
import { IDocumentForm } from "../../../../types/types";
import { FilesModalResolver } from "../FilesModal.yup";
import Text from "../../../../../../../ui/Typography/Text";
import FilesModalForm from "../FilesModalForm";

interface IFilesModalCreate {
  visible: boolean;
  setVisible: () => void;
  updateData?: () => void;
}

export const FilesModalAdd = ({
  visible,
  setVisible,
  updateData,
}: IFilesModalCreate) => {
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<IDocumentForm>({
    mode: "all",
    resolver: FilesModalResolver,
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

  const onSave = () => {
    console.log({ file: watch("file") });
  };

  return (
    <StyledModal
      closable={false}
      visible={visible}
      onCancel={onClose}
      className="modal-files"
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
          <Text level={5}>Crear archivo</Text>
        </StyledTitleContainer>

        <FormProvider {...methods}>
          <FilesModalForm />
        </FormProvider>
      </Container>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  &.modal-files {
    .ant-modal-content {
      .ant-modal-body {
        padding: 0;
      }
    }
  }

  &.modal-files {
    width: 1000px !important;
  }
`;

const StyledTitleContainer = styled(Container)`
  padding: 15px 24px;
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-transparent-1"]};
  `}
`;
