import React from "react";
import { Empty } from "antd";
import Container from "../Container";
import Text from "../Typography/Text";

interface EmptyStateProps {
  title?: string;
  description?: string;
  fullScreen?: boolean;
}

export const EmptyState = ({
  description,
  fullScreen,
  title = "",
}: EmptyStateProps) => {
  return (
    <Container position="relative" centered fullScreen={fullScreen}>
      <Empty description={false} imageStyle={IconStyle}>
        <Text weight="bold" level={2} textAlign="center">
          {title}
        </Text>
        <Text level={4} textAlign="center">
          {description}
        </Text>
      </Empty>
    </Container>
  );
};

const IconStyle = {
  height: "104px",
};
