import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

describe("SearchBar componet", () => {
  const defaultProps = {
    onSearch: jest.fn(),
    onClear: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render with default placeholder", () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("should render with custom placeholder", () => {
      render(<SearchBar placeholder="Custom Placeholder" {...defaultProps} />);
      expect(
        screen.getByPlaceholderText("Custom Placeholder")
      ).toBeInTheDocument();
    });

    it("should render search button with magnifying glass icon", () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.getByTestId("search-button")).toBeInTheDocument();
      expect(screen.getByTestId("magnifying-glass-icon")).toBeInTheDocument();
    });

    it("should not render clear button when input is empty", () => {
      render(<SearchBar {...defaultProps} />);
      expect(screen.queryByTestId("clear-button")).not.toBeInTheDocument();
    });

    it("should render clear button when input has value", async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);
      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "Limark");
      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
    });
  });
});
