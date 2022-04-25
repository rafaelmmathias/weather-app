import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { Home } from ".";

import { server } from "../../../mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("expected to render empty message", async () => {
  render(<Home />);

  const linkElement = screen.getByText(/Weather/i);
  const inputAddress = screen.getByTestId("input-address");
  userEvent.type(inputAddress, "empty");

  await waitFor(() => screen.findByText("No results found"));

  expect(linkElement).toBeInTheDocument();
});

test("expected to render all cards", async () => {
  render(<Home />);

  const inputAddress = screen.getByTestId("input-address");
  userEvent.type(inputAddress, "with result");

  await waitFor(() => screen.findByText("Tonight"));
  const items = screen.getAllByTestId("forecast-period-item");

  expect(items.length).toBe(14);
});
