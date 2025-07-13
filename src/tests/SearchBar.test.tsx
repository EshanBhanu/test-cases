import "@testing-library/jest-dom";
import SearchBar from "../components/SearchBar";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";

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

  describe("Input Handling", () => {
    it("should update input value when user types", async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);
      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "Limark");
      expect(input).toHaveValue("Limark");
    });

    it("should handle input change with fireevnt", () => {
      render(<SearchBar {...defaultProps} />);
      const input = screen.getByPlaceholderText("Search...");
      fireEvent.change(input, { target: { value: "Limark" } });
      expect(input).toHaveValue("Limark");
    });

    it("should clear input value and show/hide clear button appropriately", async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);

      const input = screen.getByPlaceholderText("Search...");
      // entering something
      await user.type(input, "Limark");
      expect(input).toHaveValue("Limark");
      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
      // Click the clear button
      await user.click(screen.getByTestId("clear-button"));
      expect(input).toHaveValue("");
      expect(screen.queryByTestId("clear-button")).not.toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("should call onSearch when form is submitted", async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);
      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "Limark");
      await user.click(screen.getByTestId("search-button"));
      expect(defaultProps.onSearch).toHaveBeenCalledWith("Limark");
    });

    it("should call onSearch when search button is clicked", async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);
      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "Limark");
      await user.click(screen.getByTestId("search-button"));
      expect(defaultProps.onSearch).toHaveBeenCalledWith("Limark");
    });

    it("should call onClear when clear button is clicked", async () => {
      const user = userEvent.setup();
      render(<SearchBar {...defaultProps} />);
      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "Limark");
      expect(screen.getByTestId("clear-button")).toBeInTheDocument();
      await user.click(screen.getByTestId("clear-button"));
      expect(defaultProps.onClear).toHaveBeenCalled();
      expect(input).toHaveValue("");
    });
  });
});
