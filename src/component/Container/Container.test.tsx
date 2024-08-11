import { render, screen, fireEvent } from "@testing-library/react";
import Container from "./index";
import { vi } from "vitest";

const mockSetPoint = vi.fn();
const mockSetTiming = vi.fn();
const mockSetRunning = vi.fn();
const mockSetIsSuccess = vi.fn();

const mockProps: any = {
  point: 3,
  setPoint: mockSetPoint,
  timing: 0,
  setTiming: mockSetTiming,
  isSuccess: undefined,
  setIsSuccess: mockSetIsSuccess,
  running: true,
  setRunning: mockSetRunning,
};

describe("Container Component", () => {
  test("clearPoint removes the point from the list when value is correct", async() => {
    render(<Container {...mockProps} />);

    // Simulate clicking on the correct point
    fireEvent.click(screen.getByText("1"));
    // Delay to wait for the point to be removed
    await new Promise((r) => setTimeout(r, 500));
    // Check if the point is removed from the list by id
    expect(document.getElementById("1")).toBeNull();
  });

  test("clearPoint stops the game and sets isSuccess to false when value is incorrect", () => {
    render(<Container {...mockProps} />);

    // Simulate clicking on an incorrect point
    fireEvent.click(screen.getByText("2"));

    // Check if the game is stopped and isSuccess is set to false
    expect(mockProps.setRunning).toHaveBeenCalledWith(false);
    expect(mockProps.setIsSuccess).toHaveBeenCalledWith(false);
  });
  test("clearPoint stops the game and sets isSuccess to true when all points are cleared", async() => {
    render(<Container {...mockProps} />);

    // Simulate clicking on the correct points
    fireEvent.click(screen.getByText("1"));
    await new Promise((r) => setTimeout(r, 500));
    fireEvent.click(screen.getByText("2"));
    await new Promise((r) => setTimeout(r, 500));
    fireEvent.click(screen.getByText("3"));
    await new Promise((r) => setTimeout(r, 500));

    // Check if the game is stopped and isSuccess is set to true
    expect(mockProps.setRunning).toHaveBeenCalledWith(false);
    expect(mockProps.setIsSuccess).toHaveBeenCalledWith(true);
  });
});
