import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Import Tailwind CSS plugin
    const tailwindcss = (await import("@tailwindcss/vite")).default;

    // Add Tailwind CSS plugin to Vite config
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());

    return config;
  },
};
export default config;
