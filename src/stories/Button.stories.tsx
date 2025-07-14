import type { ComponentProps } from "react";
import { Button } from "../components/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { TbCircleLetterLFilled } from "react-icons/tb";

type ButtonProps = ComponentProps<typeof Button>;

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Button text content",
    },
    children: {
      control: "text",
      description: "Alternative way to provide button content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Button type attribute",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    onClick: {
      action: "clicked",
      description: "Button click handler",
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    label: "Button",
  },
};

export const Primary: Story = {
  args: {
    label: "Primary Button",
    className: "bg-blue-500 hover:bg-blue-600 text-white",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    className: "bg-gray-500 hover:bg-gray-600 text-white",
  },
};

export const Success: Story = {
  args: {
    label: "Success",
    className: "bg-green-500 hover:bg-green-600 text-white",
  },
};

export const Danger: Story = {
  args: {
    label: "Delete",
    className: "bg-red-500 hover:bg-red-600 text-white",
  },
};

export const Large: Story = {
  args: {
    label: "Large Button",
    className: "bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 text-lg",
  },
};

export const Small: Story = {
  args: {
    label: "Small",
    className: "bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 text-sm",
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <>
        <span className="flex flex-row items-center">
          <TbCircleLetterLFilled className="text-3xl" />
          imark
        </span>
      </>
    ),
    className: "bg-purple-500 hover:bg-purple-600 text-white",
  },
};
