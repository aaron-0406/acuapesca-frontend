import { ComponentStory, ComponentMeta } from "@storybook/react";

import Title from ".";

export default {
  component: Title,
  title: "Components/Typography/Title",
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (props) => {
  return <Title {...props}>My awesome title</Title>;
};

export const Level1 = Template.bind({});
Level1.args = {
  level: 1,
};

export const Level2 = Template.bind({});
Level2.args = {
  level: 2,
};

export const Level3 = Template.bind({});
Level3.args = {
  level: 3,
};

export const Level4 = Template.bind({});
Level4.args = {
  level: 4,
};

export const Level5 = Template.bind({});
Level5.args = {
  level: 5,
};

export const Level1Bold = Template.bind({});
Level1Bold.args = {
  level: 1,
  weight: "bold",
};

export const Level2Bold = Template.bind({});
Level2Bold.args = {
  level: 2,
  weight: "bold",
};

export const Level3Bold = Template.bind({});
Level3Bold.args = {
  level: 3,
  weight: "bold",
};

export const Level4Bold = Template.bind({});
Level4Bold.args = {
  level: 4,
  weight: "bold",
};

export const Level5Bold = Template.bind({});
Level5Bold.args = {
  level: 5,
  weight: "bold",
};
