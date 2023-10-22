import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// runs a cleanup after each test case (e.g. clearing jsdom)
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
