import { Skeleton } from "antd";
import styled from "styled-components";

export const LabelFieldSkeleton = () => {
  return (
    <StyledLabelFieldSkeleton className="label-field-skeleton">
      <Skeleton.Input active size="small" />
    </StyledLabelFieldSkeleton>
  );
};

const StyledLabelFieldSkeleton = styled.div`
  &.label-field-skeleton {
    margin-bottom: 8px;

    .ant-skeleton-input {
      width: 100px;
      height: 24px;
    }
  }
`;
