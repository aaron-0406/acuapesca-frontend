import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import Container from "../../../../../ui/Container";
import Input from "../../../../../ui/Inputs/Input";
import TextArea from "../../../../../ui/Inputs/TextArea";
import Select from "../../../../../ui/Select";
import Spacer from "../../../../../ui/Spacer";
import { IRolsForm } from "../../types/types";

export const RolsModalForm = () => {
  const options = [
    { label: "Lector", value: 1 },
    { label: "Editor", value: 2 },
  ];
  const {
    control,
    formState: { errors },
  } = useFormContext<IRolsForm>();
  return (
    <StyledFormContainer>
      <Controller
        name="code"
        control={control}
        render={({ field }) => <Input {...field} requirement="required" placeholder="Ingrese el código del rol" label="Código:" hasError={!!errors.code} helperText={errors.code?.message} />}
      />
      <Spacer size={30} />
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextArea {...field} label="Título:" requirement="required" placeholder="Ingrese el nombre del rol" hasError={!!errors.name} helperText={errors.name?.message} />}
      />
      <Spacer size={30} />
      <Controller
        name="tag_id"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            onChange={field.onChange}
            options={options}
            defaultValue={options[0].value}
            label="Tag"
            requirement="required"
            size="large"
            style={{ width: "100%" }}
            placeholder="Seleccione una opción"
          />
        )}
      />
    </StyledFormContainer>
  );
};
const StyledFormContainer = styled(Container)`
  padding: 24px 35px;
`;
