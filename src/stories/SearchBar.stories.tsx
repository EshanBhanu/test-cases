import type { ComponentProps } from "react";
import SearchBar from "../components/SearchBar";
import type { Meta, StoryObj } from "@storybook/react";

type SearchBarProps = ComponentProps<typeof SearchBar>;

const meta: Meta<SearchBarProps> = {
  title: "Components/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    onSearch: {
      action: "searched",
      description: "Function called when search is performed",
    },
    onClear: {
      action: "cleared",
      description: "Function called when search is cleared",
    },
  },
};

export default meta;

type Story = StoryObj<SearchBarProps>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
    onSearch: (value: string) => console.log("Search:", value),
    onClear: () => console.log("Cleared"),
  },
};

export const Playground: Story = {
  args: {
    placeholder: "Type to search...",
    onSearch: (value: string) => console.log("Search:", value),
    onClear: () => console.log("Search cleared"),
    className: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls below to experiment with different SearchBar configurations. Try typing in the search field and clicking search or clear.",
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const handleSearch = (value: string) => {
      if (value.trim()) {
        alert(`Searching for: "${value}"`);
      } else {
        alert("Please enter a search term");
      }
    };

    const handleClear = () => {
      alert("Search cleared!");
    };

    return (
      <div className="text-center">
        <h3 className="text-lg font-medium mb-4">Interactive Search Demo</h3>
        <p className="text-sm text-gray-600 mb-4">
          Type something and click search or clear to see alerts
        </p>
        <SearchBar
          placeholder="Try searching something..."
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo showing SearchBar functionality with alert messages. Try typing and using the search/clear buttons.",
      },
    },
  },
};
