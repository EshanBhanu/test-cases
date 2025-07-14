import type { ComponentProps } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { Meta, StoryObj } from "@storybook/react";

type LoadingSpinnerProps = ComponentProps<typeof LoadingSpinner>;

const meta: Meta<LoadingSpinnerProps> = {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the spinner",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    fullScreen: {
      control: "boolean",
      description: "Display spinner in full screen mode",
    },
  },
};

export default meta;

type Story = StoryObj<LoadingSpinnerProps>;

// Default story
export const Default: Story = {
  args: {
    size: "md",
  },
};

// Playground - interactive story to test all variants
export const Playground: Story = {
  args: {
    size: "md",
    fullScreen: false,
    className: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls below to experiment with different LoadingSpinner configurations.",
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="mt-2 text-sm text-gray-600">Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="md" />
        <p className="mt-2 text-sm text-gray-600">Medium</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-2 text-sm text-gray-600">Large</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all available LoadingSpinner sizes: small, medium, and large.",
      },
    },
  },
};
