import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SimpleInput } from "./SimpleInput";

export default {
  component: SimpleInput,
  title: "Components/TextInput",
} as ComponentMeta<typeof SimpleInput>;

const Template: ComponentStory<typeof SimpleInput> = (props) => {
  return <SimpleInput {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "My placeholder",
  searchIcon: true,
  clearIcon: true,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: "My placeholder",
  searchIcon: true,
  clearIcon: true,
  hasError: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "My placeholder",
  searchIcon: true,
  clearIcon: true,
  disabled: true,
};
