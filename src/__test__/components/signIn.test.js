import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignInForm from "../../components/SignInForm";

describe("SignInForm", () => {
  it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
    const onSubmitMock = jest.fn();

    const { getByTestId, getByText } = render(
      <SignInForm onSubmit={onSubmitMock} />,
    );

    fireEvent.changeText(getByTestId("usernameField"), "testuser");
    fireEvent.changeText(getByTestId("passwordField"), "password123");

    fireEvent.press(getByText("Sign In"));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);

      expect(onSubmitMock.mock.calls[0][0]).toEqual({
        username: "testuser",
        password: "password123",
      });
    });
  });
});
