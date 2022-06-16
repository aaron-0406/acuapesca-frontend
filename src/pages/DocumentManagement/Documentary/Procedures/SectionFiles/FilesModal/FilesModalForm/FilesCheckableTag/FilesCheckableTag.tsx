import { useState } from "react";
import Tag from "antd/lib/tag";
import Container from "../../../../../../../../ui/Container";
import styled from "styled-components";

const { CheckableTag } = Tag;

const tagsData = ["MOVIES", "BOOKS", "MUSIC", "SPORTS"];

export const FilesCheckableTag = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(["BOOKS"]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <StyledWrapContainer>
      <StyledContainer width="max-content" display="flex" alignItems="center">
        {tagsData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </StyledContainer>
    </StyledWrapContainer>
  );
};

const StyledWrapContainer = styled(Container)`
  width: 100%;
  overflow-x: scroll;
`;

const StyledContainer = styled(Container)`
  height: 50px;
`;
