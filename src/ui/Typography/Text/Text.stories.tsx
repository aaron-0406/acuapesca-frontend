import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Text from ".";

export default {
  component: Text,
  title: "Components/Typography/Text",
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (props) => {
  return <Text {...props}>My awesome text</Text>;
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
