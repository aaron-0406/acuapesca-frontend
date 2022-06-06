import { notification, Skeleton } from "antd";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import paths from "../../../../../shared/routes/paths";
import { getProcessByID } from "../../../../../shared/utils/services/processesServices";
import Button from "../../../../../ui/Button";
import Container from "../../../../../ui/Container";
import Icon from "../../../../../ui/Icon";
import Text from "../../../../../ui/Typography/Text";

export const ProceduresProcessTitle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const onGetProcessById = useCallback(async () => {
    try {
      setLoading(true);
      const result: AxiosResponse<any, any> = await getProcessByID(Number(id));

      if (result) {
        const { data } = result;
        const { error, process } = data;

        if (process) {
          setTitle(process.name);
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
  }, [id]);

  useEffect(() => {
    onGetProcessById();
  }, [onGetProcessById]);

  const onBackProcesses = () => {
    navigate(paths.documentary.root);
  };

  return (
    <StyledTitleContainer
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        type="secondary"
        icon={<Icon size={25} remixiconClass="ri-arrow-left-fill" />}
        onClick={onBackProcesses}
      />
      <StyledTitleText textAlign="center" level={2} weight="bold">
        {title ? title : <Skeleton.Input active={true} size="large" />}
      </StyledTitleText>
    </StyledTitleContainer>
  );
};

const StyledTitleContainer = styled(Container)`
  padding: 12px 20px;

  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors["$color-transparent-dark-95"]};
  `}
`;

const StyledTitleText = styled(Text)`
  display: block;
  width: 100%;
  padding-left: 20px;
`;
