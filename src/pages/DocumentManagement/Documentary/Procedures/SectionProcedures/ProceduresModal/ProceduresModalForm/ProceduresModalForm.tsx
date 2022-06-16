import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import Container from "../../../../../../../ui/Container";
import InputLabel from "../../../../../../../ui/InputLabel";
import Input from "../../../../../../../ui/Inputs/Input";
import Spacer from "../../../../../../../ui/Spacer";
import Switch from "../../../../../../../ui/Switch";
import { IProceduresForm } from "../../../../types/types";

export const ProceduresModalForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IProceduresForm>();

  return (
    <StyledFormContainer>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            requirement="required"
            placeholder="Ingrese el código del documento"
            label="Código:"
            hasError={!!errors.code}
            helperText={errors.code?.message}
          />
        )}
      />
      <Spacer size={30} />
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            requirement="required"
            placeholder="Ingrese el título del documento"
            label="Título:"
            hasError={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      <Spacer size={30} />
      <Container display="flex" width="100%" justifyContent="space-between">
        <InputLabel
          label="Disponibilidad"
          requirement="required"
          disabled={false}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Switch onChange={field.onChange} checked={field.value} />
          )}
        />
      </Container>
    </StyledFormContainer>
  );
};

const StyledFormContainer = styled(Container)`
  padding: 24px 35px;
`;
