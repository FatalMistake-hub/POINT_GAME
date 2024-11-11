import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./index";
import { vi } from "vitest";

// Mock the necessary functions
const mockSetPoint = vi.fn();
const mockSetTiming = vi.fn();
const mockSetRunning = vi.fn();

// Mock setInterval and clearInterval
const mockSetInterval = vi.spyOn(global, "setInterval");
const mockClearInterval = vi.spyOn(global, "clearInterval");

const mockProps: any = {
  point: 0,
  setPoint: mockSetPoint,
  timing: 0,
  setTiming: mockSetTiming,
  isSuccess: undefined,
  running: false,
  setRunning: mockSetRunning,
};

describe("Header Component", () => {
  test("renders the Header component with default state", () => {
    render(<Header {...mockProps} />);
    expect(screen.getByText("LET'S PLAY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter point")).toHaveValue(0);
    expect(screen.getByText("0.0s")).toBeInTheDocument();
  });

  test("updates point value on input change", () => {
    render(<Header {...mockProps} />);
    const input = screen.getByPlaceholderText("Enter point");
    fireEvent.change(input, { target: { value: "10" } });
    expect(mockSetPoint).toHaveBeenCalledWith(10);
  });

  test("displays correct message when game is won", () => {
    render(<Header {...mockProps} isSuccess={true} running={false} />);
    expect(screen.getByText("ALL CLEARED")).toBeInTheDocument();
  });

  test("displays correct message when game is lost", () => {
    render(<Header {...mockProps} isSuccess={false} running={false} />);
    expect(screen.getByText("GAME OVER")).toBeInTheDocument();
  });

  test("calls setRunning and resets timing and point on button click", () => {
    render(<Header {...mockProps} />);
    const button = screen.getByText("Play");
    fireEvent.click(button);
    expect(mockSetRunning).toHaveBeenCalledWith(true);
    expect(mockSetTiming).toHaveBeenCalledWith(0);
  });

  test("sets interval and timing when game is running and clears interval when game is stopped", ()=>{
    render(<Header {...mockProps} running={true} />);
    expect(mockSetInterval).toHaveBeenCalled();
    render(<Header {...mockProps} running={false} />);
    expect(mockClearInterval).toHaveBeenCalled();
  });
  afterAll(() => {
    mockClearInterval.mockRestore();
    mockSetInterval.mockRestore();
  });
});
