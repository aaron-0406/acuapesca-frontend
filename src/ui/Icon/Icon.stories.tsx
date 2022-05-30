import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { colors } from "../styles/global/themes/mainTheme";
import Icon from ".";

export default {
  component: Icon,
  title: "Components/Icon",
  argTypes: {
    remixiconClass: {
      control: "text",
      name: "remixiconClass (from https://remixicon.com)",
    },
    color: {
      options: Object.keys(colors),
      control: "select",
    },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (props) => <Icon {...props} />;

export const Playground = Template.bind({});
Playground.args = {
  remixiconClass: "ri-heart-3-fill",
  color: "$color-primary-2",
  size: 60,
};
