import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../components/Button";

describe("Button component", () => {
  it("render with label prop", () => {
    render(<Button label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("render with children prop", () => {
    render(<Button children={<span>Click Me</span>} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  it("applies custom className", () => {
    render(<Button className="mt-10 mb-20" />);
    expect(screen.getByRole("button")).toHaveClass("mt-10 mb-20");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("type: button to type: submit", () => {
    render(<Button type="submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
