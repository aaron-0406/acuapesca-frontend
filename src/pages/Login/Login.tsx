import Container from "../../ui/Container";
import Input from "../../ui/Inputs/Input";
import { useForm, Controller } from "react-hook-form";
import { LoginWithEmailResolver } from "./Login.yup";
import styled, { css } from "styled-components";
import Spacer from "../../ui/Spacer";
import Button from "../../ui/Button";
import logo from "../../shared/assets/images/logo.png";
import programadorLogo from "../../shared/assets/images/programador_logo.png";
import { setAuthentication } from "../../shared/utils/storage/auth";
import { useGeneralContext } from "../../shared/contexts/StoreProvider";
import { ActionTypes } from "./actions";
import { logIn, TokenResponseType } from "./api";
import { AxiosError, AxiosResponse } from "axios";
import { useAutoLoaderContext } from "../../ui/AutoLoader/AutoLoaderProvider";
import { notification } from "antd";

interface ILoginFields {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ILoginFields>({
    mode: "all",
    resolver: LoginWithEmailResolver,
  });

  const { setStatus } = useAutoLoaderContext();

  const { dispatch } = useGeneralContext();

  const emailWatcher = watch("email") || "";
  const passwordWatcher = watch("password");

  const onSubmit = async () => {
    try {
      setStatus("LOADING");

      const result: AxiosResponse<TokenResponseType, any> = await logIn({
        email: emailWatcher,
        password: passwordWatcher,
      });

      if (result) {
        const { data } = result;
        const { token, user, success, error } = data;
        if (token) {
          setAuthentication(token);
          dispatch({ type: ActionTypes.Login, payload: { admin: user } });
          setStatus("IDLE");
          notification["success"]({
            message: success,
          });
        }

        if (error) {
          setStatus("IDLE");
          notification["warn"]({
            message: error,
          });
        }
      }
    } catch (error: any) {
      setStatus("IDLE");
      notification["error"]({
        message: error.message as string,
      });
    }
  };

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledContainerLogo display="flex" justifyContent="flex-end">
          <img src={logo} width="110px" />
        </StyledContainerLogo>

        <Spacer size={37} />

        <Container
          maxHeight="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <img src={programadorLogo} width="190px" />

          <Spacer size={37} />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Usuario"
                size="large"
                hasError={!!errors.email}
                helperText={errors.email?.message}
                width="282px"
                maxWidth="400px"
              />
            )}
          />

          <Spacer size={27} />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Contraseña"
                size="large"
                hasError={!!errors.password}
                helperText={errors.password?.message}
                width="282px"
                maxWidth="400px"
                type="password"
              />
            )}
          />

          <Spacer size={57} />

          <Button
            size="large"
            shape="round"
            type="primary"
            title="Iniciar Sesión"
            disabled={!isValid}
            htmlType="submit"
          />

          <Spacer size={97} />
        </Container>
      </StyledForm>
    </Container>
  );
};

const StyledForm = styled.form`
  width: 411px;
  height: 664px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-transparent-3"]};
    `}
`;

const StyledContainerLogo = styled(Container)`
  padding: 15px;
`;
