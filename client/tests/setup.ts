import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
  cleanup();
});
(window as any).matchMedia = (query: string) => {
  return {
    matches: false, // Set the desired value for the query
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
  };
};
