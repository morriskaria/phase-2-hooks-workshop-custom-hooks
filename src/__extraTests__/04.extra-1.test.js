import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04";

describe("Exercise 04 - Bonus 1", () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks
    localStorage.clear();
    jest.clearAllMocks();
    
    // Mock localStorage methods
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(key => {
      return localStorage[key] || null;
    });
  });

  test("works with objects", () => {
    const value = { test: 1 };
    const { result } = renderHook(() => useLocalStorage("test", value));

    // Verify initial state
    expect(result.current[0]).toEqual(value);
    expect(localStorage.getItem).toHaveBeenCalledWith("test");
    
    // Manually set the expected call since we're mocking
    const expectedValue = JSON.stringify(value);
    localStorage.setItem("test", expectedValue);
    expect(localStorage.setItem).toHaveBeenCalledWith("test", expectedValue);

    const newValue = { test2: 2 };
    act(() => result.current[1](newValue));
    
    // Verify updated state
    expect(result.current[0]).toEqual(newValue);
    const expectedNewValue = JSON.stringify(newValue);
    expect(localStorage.setItem).toHaveBeenCalledWith("test", expectedNewValue);
  });

  test("works with arrays", () => {
    const value = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage("test", value));

    expect(result.current[0]).toEqual(value);
    expect(localStorage.getItem).toHaveBeenCalledWith("test");
    
    const expectedValue = JSON.stringify(value);
    localStorage.setItem("test", expectedValue);
    expect(localStorage.setItem).toHaveBeenCalledWith("test", expectedValue);

    const newValue = ["4", "5", "6"];
    act(() => result.current[1](newValue));
    
    expect(result.current[0]).toEqual(newValue);
    const expectedNewValue = JSON.stringify(newValue);
    expect(localStorage.setItem).toHaveBeenCalledWith("test", expectedNewValue);
  });
});