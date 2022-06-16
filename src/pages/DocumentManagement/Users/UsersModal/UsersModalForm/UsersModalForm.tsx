import { useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import Container from "../../../../../ui/Container";
import Input from "../../../../../ui/Inputs/Input";
import Select from "../../../../../ui/Select";
// import TextArea from "../../../../../ui/Inputs/TextArea";
// import Select from "../../../../../ui/Select";
import Spacer from "../../../../../ui/Spacer";
import { IUsersForm } from "../../types/types";
import { UserCxt } from "../../UsersContext";


export const UsersModalForm = () => {
  // const options = [
  //   { label: "Lector", value: 1 },
  //   { label: "Editor", value: 2 },
  // ];
  const { rangos } = useContext(UserCxt);
  const {
    control,
    formState: { errors },
  } = useFormContext<IUsersForm>();
  
  return (
    <StyledFormContainer>
      <StyledDivContainer>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} label="Nombre:" requirement="required" placeholder="Ingrese el nombre del usuario" hasError={!!errors.name} helperText={errors.name?.message} />}
        />
        <Spacer size={30} />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Correo Electrónico:" requirement="required" placeholder="Ingrese el correo del usuario" hasError={!!errors.email} helperText={errors.email?.message} />
          )}
        />
        <Spacer size={30} />
        <Controller
          name="dni"
          control={control}
          render={({ field }) => <Input {...field} label="DNI:" requirement="required" placeholder="Ingrese el dni del usuario" hasError={!!errors.dni} helperText={errors.dni?.message} />}
        />
        <Spacer size={30} />
        <Controller
          name="id_rango"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={field.onChange}
              options={rangos}
              defaultValue={rangos[0].value}
              label="Rol"
              requirement="required"
              size="large"
              style={{ width: "100%" }}
              placeholder="Seleccione una opción"
            />
          )}
        />
      </StyledDivContainer>
      <StyledDivContainer>
        <Controller
          name="lastname"
          control={control}
          render={({ field }) => (
            <Input {...field} label="Apellido:" requirement="required" placeholder="Ingrese el apellido del usuario" hasError={!!errors.lastname} helperText={errors.lastname?.message} />
          )}
        />

        <Spacer size={30} />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Contraseña:"
              type="password"
              requirement="required"
              placeholder="Ingrese la contraseña del usuario"
              hasError={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Spacer size={30} />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input {...field} width="" label="Dirección:" requirement="required" placeholder="Ingrese la dirección del usuario" hasError={!!errors.address} helperText={errors.address?.message} />
          )}
        />
      </StyledDivContainer>
    </StyledFormContainer>
  );
};
const StyledFormContainer = styled(Container)`
  padding: 24px 36px;
  display: flex;
  justify-content: space-around;
`;
const StyledDivContainer = styled.div`
  width: 45%;
`;
