import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Icon } from "../Icon/Icon";
import Button from ".";

export default {
  component: Button,
  title: "Components/Button/Regular",
  argTypes: {
    type: {
      options: ["primary", "dashed", "link", "text", "secondary"],
      control: { type: "select" },
    },
    size: {
      options: ["large", "small"],
      control: { type: "select" },
    },
    shape: {
      options: ["round", "square"],
      control: { type: "radio" },
    },
    title: {
      control: "text",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (props) => (
  <Button title="Button" {...props} />
);

export const Playground = Template.bind({});
Playground.args = {
  disabled: false,
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  type: "primary",
  shape: "round",
  size: "middle",
  weight: "bold",
};

export const Dangerous = Template.bind({});
Dangerous.args = {
  disabled: false,
  type: "primary",
  shape: "round",
  size: "small",
  danger: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  disabled: false,
  type: "primary",
  shape: "round",
  size: "large",
  trailIcon: <Icon remixiconClass="ri-arrow-right-s-line" />,
  leadIcon: <Icon remixiconClass="ri-arrow-right-s-line" />,
  loading: false,
};

export const Elipsis = Template.bind({});
Elipsis.args = {
  disabled: false,
  title: "My new and with elipsis button",
  type: "primary",
  shape: "round",
  size: "middle",
  weight: "bold",
  $width: "200px",
};
