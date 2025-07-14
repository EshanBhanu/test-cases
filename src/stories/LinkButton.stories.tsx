import type { ComponentProps } from "react";
import { LinkButton } from "../components/LinkButton";
import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

type LinkButtonProps = ComponentProps<typeof LinkButton>;

const meta: Meta<LinkButtonProps> = {
  title: "Components/LinkButton",
  component: LinkButton,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    to: {
      control: "text",
      description: "Navigation path",
    },
    children: {
      control: "text",
      description: "Button content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "dark", "gradient", "authenticated"],
      description: "Button variant style",
    },
    userName: {
      control: "text",
      description: "User name for authenticated variant",
      if: { arg: "variant", eq: "authenticated" },
    },
    onClick: {
      action: "clicked",
      description: "Button click handler",
    },
    onLogout: {
      action: "logout",
      description: "Logout handler for authenticated variant",
      if: { arg: "variant", eq: "authenticated" },
    },
  },
};

export default meta;

type Story = StoryObj<LinkButtonProps>;

export const Default: Story = {
  args: {
    to: "/home",
    children: "Link Button",
    variant: "primary",
  },
};

export const Authenticated: Story = {
  args: {
    to: "#",
    variant: "authenticated",
    userName: "Eshan",
    onLogout: () => console.log("User logged out"),
  },
};

export const Playground: Story = {
  args: {
    to: "/playground",
    children: "Playground Button",
    variant: "primary",
    userName: "Eshan",
    onLogout: () => console.log("User logged out"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls below to experiment with different LinkButton configurations and variants.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <LinkButton to="/primary" variant="primary">
        Primary
      </LinkButton>
      <LinkButton to="/secondary" variant="secondary">
        Secondary
      </LinkButton>
      <LinkButton to="/dark" variant="dark">
        Dark
      </LinkButton>
      <LinkButton to="/gradient" variant="gradient">
        Gradient
      </LinkButton>
      <div className="col-span-2 flex justify-center">
        <LinkButton
          variant="authenticated"
          userName="Eshan"
          onLogout={() => console.log("Eshan logged out")}
          to="#"
        >
          Authenticated
        </LinkButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all available LinkButton variants in a grid layout.",
      },
    },
  },
};
