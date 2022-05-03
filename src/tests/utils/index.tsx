import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SWRConfig } from "swr";

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

/**
 * Render a component without swr caching between tests.
 */
export const SwrWithoutCache = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      {children}
    </SWRConfig>
  );
};
