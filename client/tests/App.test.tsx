import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../src/App";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

import { MemoryRouter } from "react-router-dom";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("app renders", () => {
    render(
      <Provider store={store}>
        <Toaster reverseOrder={false} />
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    screen.debug();
  });
});
