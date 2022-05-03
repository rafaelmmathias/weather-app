import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { SwrWithoutCache, typeAddressAndAwaitForResult } from "tests/utils";

import { Home } from ".";
import {
  GEOLOCATION_ENDPOINT,
  getAddressEmptyHandler,
  getAddressExceptionHandler,
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
    <SwrWithoutCache>
      <Home />
    </SwrWithoutCache>
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
  });

  const options = [
    { value: "1", expectedCardsLength: 2 },
    { value: "2", expectedCardsLength: 4 },
    { value: "3", expectedCardsLength: 6 },
    { value: "4", expectedCardsLength: 8 },
    { value: "5", expectedCardsLength: 10 },
    { value: "6", expectedCardsLength: 12 },
    { value: "7", expectedCardsLength: 14 },
  ];

  options.forEach((option) => {
    it(`should render ${option.expectedCardsLength} cards when select the option ${option.value} days`, async () => {
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

      const selectNumberOfDays = screen.getByTestId("number-of-days-select");

      userEvent.selectOptions(selectNumberOfDays, [option.value]);

      await waitFor(() => screen.findByText("Tonight"));

      const itemsAfterSelection = screen.getAllByTestId("forecast-period-item");
      expect(itemsAfterSelection.length).toBe(option.expectedCardsLength);
    });
  });

  it("should render forecast request error card", async () => {
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

  it("should render address request error card", async () => {
    server.use(getAddressExceptionHandler);
    renderHomeWithoutSWRCache();

    const inputAddress = screen.getByTestId("input-address");

    await typeAddressAndAwaitForResult(
      inputAddress,
      "random string",
      "An error occurred while fetching your address"
    );

    const error = screen.getByTestId("forecast-address-error");

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
