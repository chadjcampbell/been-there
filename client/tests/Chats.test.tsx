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

  it("renders friends list", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Toaster reverseOrder={false} />
        <MemoryRouter>
          <Chats />
        </MemoryRouter>
      </Provider>
    );

    const mockFriends = [
      {
        user_id: 3,
        name: "Tony Stark",
        email: "tonyStark@gmail.com",
        photo_url:
          "http://res.cloudinary.com/duu3fdfk0/image/upload/v1693437366/tsnhn06pziqaqczwkvec.webp",
        bio: "Add your bio here to tell people who you are and where you've been...",
        registration_date: "2023-08-20T16:08:26.121Z",
      },
      {
        user_id: 1,
        name: "Chad Campbell",
        email: "chadjcampbell@gmail.com",
        photo_url:
          "http://res.cloudinary.com/duu3fdfk0/image/upload/v1692742707/gichrkite7r6ofpwdz1p.webp",
        bio: "👔 Sales & Management Pro | 💻 Full Stack Dev Enthusiast \n\n📈 15 Years in Sales & Management 🌟\n🔧 Building digital bridges, one code at a time 🌁\n🌟 Passionate about tech, innovation, and growth 🚀\n📚 Lifelong learner, embracing new challenges 📖\n🌎 Exploring the digital world, one project at a time 🚀",
        registration_date: "2023-08-17T21:19:24.686Z",
      },
    ];

    vi.spyOn(friendService, "findAllFriends").mockResolvedValue(mockFriends);

    await waitFor(() => {
      expect(getByLabelText("Open Chats")).toBeDefined();
    });

    await waitFor(() => {
      expect(getByText("Chad Campbell")).toBeDefined();
      expect(getByText("Tony Stark")).toBeDefined();
    });
  });
});
