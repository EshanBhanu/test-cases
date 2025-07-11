import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../components/Button";

describe("Button Component", () => {
  it("renders with label prop", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with children instead of label", () => {
    render(<Button label="Label">Children content</Button>);
    expect(screen.getByText("Children content")).toBeInTheDocument();
    expect(screen.queryByText("Label")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button label="Test" className="custom-class" />);
    const button = screen.getByText("Test");
    expect(button).toHaveClass("custom-class");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets correct button type", () => {
    render(<Button label="Submit" type="submit" />);
    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("defaults to button type", () => {
    render(<Button label="Default" />);
    const button = screen.getByText("Default");
    expect(button).toHaveAttribute("type", "button");
  });

  it("passes through other props", () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });
});
