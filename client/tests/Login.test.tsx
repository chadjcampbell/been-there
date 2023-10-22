import { fireEvent, waitFor, render } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import Login from "../src/routes/Login";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { MemoryRouter } from "react-router-dom";

describe("Login Component", () => {
  it("renders without errors", () => {
    render(
      <Provider store={store}>
        <Toaster reverseOrder={false} />
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  });

  it("submits the form with valid data", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Toaster reverseOrder={false} />
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    vi.mock("react-hot-toast", async () => {
      const actual: any = await vi.importActual("react-hot-toast");
      return {
        ...actual,
        Toaster: vi.fn(), // Mock the Toaster component
      };
    });

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "demoUser@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "demoUser" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveProperty("disabled");
    });
  });

  it("displays an error message for invalid input", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Toaster reverseOrder={false} />
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    const submitButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("Please enter a valid email")).toBeDefined();
    });
  });
});
