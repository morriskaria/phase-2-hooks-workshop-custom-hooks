import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("Exercise 04 - Bonus 2", () => {
  test("updates state after storage events", () => {
    const { result } = renderHook(() => useLocalStorage("test", "old value"));

    act(() => {
      // Create a simpler storage event without storageArea
      const event = new Event('storage');
      event.key = "test";
      event.newValue = JSON.stringify("new value");
      event.oldValue = JSON.stringify("old value");
      window.dispatchEvent(event);
    });

    expect(result.current[0]).toBe("new value");
  });

  test("the event handler function is removed when the component unmounts", () => {
    const spy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useLocalStorage("test"));
    unmount();
    expect(spy).toHaveBeenCalledWith("storage", expect.any(Function));
  });
});