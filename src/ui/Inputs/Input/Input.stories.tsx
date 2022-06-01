import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "./Input";

export default {
  component: Input,
  title: "Components/TextInput",
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (props) => {
  return <Input {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "My placeholder",
  label: "My new label",
  helperText: "My awesome helper",
  searchIcon: true,
  clearIcon: true,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: "My placeholder",
  label: "My new label",
  helperText: "My awesome helper",
  searchIcon: true,
  clearIcon: true,
  hasError: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "My placeholder",
  label: "My new label",
  helperText: "My awesome helper",
  searchIcon: true,
  clearIcon: true,
  disabled: true,
};
