import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import Container from "../../../../../../ui/Container";
import Input from "../../../../../../ui/Inputs/Input";
import TextArea from "../../../../../../ui/Inputs/TextArea";
import Spacer from "../../../../../../ui/Spacer";
import { IProcessesForm } from "../../../types/types";

export const ProcessesModalForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IProcessesForm>();

  return (
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
            {...field}
            label="Título:"
            requirement="required"
            placeholder="Ingrese título del proceso"
            hasError={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />
    </StyledFormContainer>
  );
};

const StyledFormContainer = styled(Container)`
  padding: 24px 35px;
`;
