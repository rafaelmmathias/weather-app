import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const typeAddressAndAwaitForResult = async (
  inputElement: HTMLElement,
  text: string,
  expectText: string
) => {
  userEvent.clear(inputElement);

  await waitFor(() => screen.findByPlaceholderText("start typing an address"));

  userEvent.type(inputElement, text);
  await waitFor(() => screen.findByText(expectText));
};
