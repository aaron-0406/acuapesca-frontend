import { useEffect, useContext } from "react";
import { Spin } from "antd";
import styled from "styled-components";
import Container from "../Container";
import Icon from "../Icon";
import Text from "../Typography/Text";
import { useAutoLoaderContext } from "./AutoLoaderProvider";
import { BrowserHistory } from "history";
import { UNSAFE_NavigationContext } from "react-router-dom";

export const AutoLoader = () => {
  const { status, setStatus } = useAutoLoaderContext();

  const navigation = useContext(UNSAFE_NavigationContext)
    .navigator as BrowserHistory;

  useEffect(() => {
    if (navigation) {
      return navigation.listen(() => setStatus("IDLE"));
    }
  }, [navigation, setStatus]);

  if (status === "LOADING") {
    return (
      <StyledDiv>
        <Spin
          indicator={
            <Icon
              remixiconClass="ri-loader-fill"
              size={24}
              color="$color-primary-1"
              spinning
            />
          }
        />
      </StyledDiv>
    );
  }

  if (status === "SAVED") {
    return (
      <StyledDiv>
        <Container display="flex">
          <Text type="success" className="title" level={3}>
            Saved
          </Text>
          <Icon
            remixiconClass="ri-checkbox-circle-line"
            color="$color-success"
          />
        </Container>
      </StyledDiv>
    );
  }

  if (status === "ERROR") {
    return (
      <StyledDiv>
        <Container display="flex">
          <Text type="danger" className="title" level={3}>
            Not Saved
          </Text>
          <Icon remixiconClass="ri-cloud-off-line" color="$color-error" />
        </Container>
      </StyledDiv>
    );
  }

  return null;
};

const StyledDiv = styled.div`
  z-index: 3000;
  position: fixed;
  right: 80px;
  top: 25px;

  .title {
    margin-right: 8px;
  }
`;
