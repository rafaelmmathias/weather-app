import { render, screen, waitFor } from "@testing-library/react";
import * as timers from "timers";

import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-test-renderer";
import { SWRConfig } from "swr";
import { typeAddressAndAwaitForResult } from "tests/utils";

import { Home } from ".";
import {
  GEOLOCATION_ENDPOINT,
  getAddressEmptyHandler,
  getAddressWithResultsHandler,
} from "../../../mocks/geocoder/handlers";

import { server } from "../../../mocks/server";
import {
  getWeatherPointHandlerException,
  WEATHER_POINT_ENDPOINT,
} from "../../../mocks/weatherApi/handlers";

/**
 * Render the Home component without caching between tests.
 */
const renderHomeWithoutSWRCache = () => {
  render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <Home />
    </SWRConfig>
  );
};

const ADDRESS_1 = "first address typed";
const ADDRESS_2 = "second address typed";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Testing rendering elements rules through the requests", () => {
  it("should render empty message", async () => {
    server.use(getAddressEmptyHandler);
    renderHomeWithoutSWRCache();

    const titleElement = screen.getByText(/Weather/i);
    const inputAddress = screen.getByTestId("input-address");

    await typeAddressAndAwaitForResult(
      inputAddress,
      "random string",
      "No results found"
    );

    expect(titleElement).toBeInTheDocument();
  });

  it("should render all cards", async () => {
    server.use(getAddressWithResultsHandler);
    renderHomeWithoutSWRCache();

    const inputAddress = screen.getByTestId("input-address");
    await typeAddressAndAwaitForResult(
      inputAddress,
      "random string",
      "Tonight"
    );

    const items = screen.getAllByTestId("forecast-period-item");

    expect(items.length).toBe(14);
    jest.useRealTimers();
  });

  it("should render error card", async () => {
    server.use(getWeatherPointHandlerException);
    renderHomeWithoutSWRCache();

    const inputAddress = screen.getByTestId("input-address");

    await typeAddressAndAwaitForResult(
      inputAddress,
      "random string",
      "An error occurred while fetching the forecast"
    );

    const error = screen.getByTestId("forecast-error");

    expect(error).toBeInTheDocument();
  });
});

describe("Testing cache strategy in geolocation service", () => {
  it("should call address api once while typing", async () => {
    const resolver = jest.fn();

    const mockedHandler = rest.get(GEOLOCATION_ENDPOINT, resolver);
    server.use(mockedHandler);

    renderHomeWithoutSWRCache();

    const inputAddress = screen.getByTestId("input-address");

    await typeAddressAndAwaitForResult(
      inputAddress,
      "typing a lot of characteres",
      "Tonight"
    );

    expect(resolver).toHaveBeenCalledTimes(1);
  });

  it("should call address api once when we type the same address twice", async () => {
    const resolver = jest.fn();

    const mockedHandler = rest.get(GEOLOCATION_ENDPOINT, resolver);
    server.use(mockedHandler);

    renderHomeWithoutSWRCache();
    const inputAddress = screen.getByTestId("input-address");

    await typeAddressAndAwaitForResult(inputAddress, ADDRESS_1, "Tonight");
    expect(resolver).toHaveBeenCalledTimes(1);
    await typeAddressAndAwaitForResult(inputAddress, ADDRESS_2, "Tonight");
    expect(resolver).toHaveBeenCalledTimes(2);
    await typeAddressAndAwaitForResult(inputAddress, ADDRESS_1, "Tonight");
    await typeAddressAndAwaitForResult(inputAddress, ADDRESS_2, "Tonight");
    await typeAddressAndAwaitForResult(inputAddress, ADDRESS_1, "Tonight");
    await typeAddressAndAwaitForResult(inputAddress, ADDRESS_2, "Tonight");

    expect(resolver).toHaveBeenCalledTimes(2);
  });
});

describe("Testing cache strategy in weather service", () => {
  it("should call weather service once for the same point location", async () => {
    const resolver = jest.fn();

    const mockedHandler = rest.get(WEATHER_POINT_ENDPOINT, resolver);
    server.use(mockedHandler);
    renderHomeWithoutSWRCache();

    const inputAddress = screen.getByTestId("input-address");
    userEvent.type(inputAddress, ADDRESS_1);

    await waitFor(() => screen.findByText("Tonight"));

    expect(resolver).toHaveBeenCalledTimes(1);

    userEvent.clear(inputAddress);
    userEvent.type(inputAddress, ADDRESS_2);
    await waitFor(() => screen.findByText("Tonight"));

    expect(resolver).toHaveBeenCalledTimes(1);
  });
});
