import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SwrWithoutCache } from "tests/utils";

import { server } from "../../mocks/server";
import { useAddresses } from "./useAddresses";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SwrWithoutCache>{children}</SwrWithoutCache>
);

const renderAddressesHook = (address: string) =>
  renderHook(() => useAddresses(address), {
    wrapper,
  });

describe("useAddress hook", () => {
  it("should indicate the loading state", async () => {
    const { result, waitForNextUpdate } = renderAddressesHook("address");
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.isLoading).toBe(false);
  });

  it("should get address", async () => {
    const { result, waitForNextUpdate } = renderAddressesHook("address");

    await waitForNextUpdate();
    expect(result.current.addresses?.length).toBe(1);
  });
});
