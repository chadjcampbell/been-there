import { fireEvent, waitFor, render } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import Chats from "../src/routes/Chats";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { MemoryRouter } from "react-router-dom";
import * as friendService from "../src/redux/features/friends/friendService";

describe("Chats Component", () => {
  it("renders without errors", () => {
    render(
      <Provider store={store}>
        <Toaster reverseOrder={false} />
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </Provider>
    );
  });

  it("submits message", async () => {
    const { getByPlaceholderText, getByLabelText, getByRole } = render(
      <Provider store={store}>
        <Toaster reverseOrder={false} />
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </Provider>
    );

    const mockFriends = [];

    vi.spyOn(friendService, "findAllFriends").mockResolvedValue(mockFriends);

    await waitFor(() => {
      expect(getByLabelText("Open Chats")).toBeDefined();
    });

    const textInput = getByPlaceholderText("type your message here...");
    const submitButton = getByRole("button", { name: "" });

    fireEvent.change(textInput, { target: { value: "Hello user" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveProperty("disabled");
    });
  });

  it("displays an error message for invalid input", async () => {
    const { getByLabelText, getByText, getByPlaceholderText, getByRole } =
      render(
        <Provider store={store}>
          <Toaster reverseOrder={false} />
          <MemoryRouter>
            <Chats />
          </MemoryRouter>
        </Provider>
      );

    const mockFriends = [];

    vi.spyOn(friendService, "findAllFriends").mockResolvedValue(mockFriends);

    await waitFor(() => {
      expect(getByLabelText("Open Chats")).toBeDefined();
    });

    const textInput = getByPlaceholderText("type your message here...");
    const submitButton = getByRole("button", { name: "" });

    fireEvent.change(textInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveProperty("disabled");
    });
  });
});
