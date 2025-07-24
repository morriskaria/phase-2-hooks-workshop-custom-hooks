import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

describe("Exercise 04", () => {
  test("has an initial value of null if no value is passed in as a second argument", () => {
    const { result } = renderHook(() => useLocalStorage("test"));
    expect(result.current).toMatchObject([null, expect.any(Function)]);
  });

  test("saves the value in localStorage when state is updated", () => {
    const { result } = renderHook(() => useLocalStorage("test", "initial"));
    const newValue = "new value";

    act(() => {
      result.current[1](newValue);
    });

    expect(localStorage.setItem).toHaveBeenLastCalledWith("test", JSON.stringify(newValue));
    expect(localStorage.__STORE__["test"]).toBe(JSON.stringify(newValue));
    expect(result.current[0]).toBe(newValue);
  });
});