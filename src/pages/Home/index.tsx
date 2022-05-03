import React, { useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { WiDayCloudy } from "react-icons/wi";

import { Box, Card, ErrorInline, Input, Span, Heading } from "components";
import { useAddresses } from "hooks/useAddresses";
import { useForecast } from "hooks/useForecast";
import { groupForecastPeriodByDay } from "utils/utils";

import { ForecastPeriod } from "./components/ForecastPeriod";
import { Select, SelectOptions } from "components/Select";

export const Home: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [numberOfDays, setNumberOfDays] = useState<number>(7);

  const { addresses, isLoading, error: addressError } = useAddresses(address);

  const {
    forecast,
    error: forecastError,
    isLoading: isLoadingForecast,
  } = useForecast(addresses ? addresses[0] : undefined, numberOfDays);

  const groupedForecast = useMemo(() => {
    return groupForecastPeriodByDay(forecast?.periods);
  }, [forecast]);

  const debouncedAddressHandler = useRef(
    debounce((newValue) => {
      setAddress(newValue);
    }, 500)
  );

  const addressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setAddress("");
      return;
    }

    debouncedAddressHandler.current(e.target.value);
  };

  const onSelectNumberOfDays = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setNumberOfDays(Number(value));
  };

  const daysOptions = useMemo(
    () =>
      [
        {
          label: "1 day",
          value: "1",
        },
        { label: "2 days", value: "2" },
        { label: "3 days", value: "3" },
        { label: "4 days", value: "4" },
        { label: "5 days", value: "5" },
        { label: "6 days", value: "6" },
        { label: "7 days", value: "7" },
      ] as SelectOptions,
    []
  );

  return (
    <Box
      marginTop={50}
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
    >
      <WiDayCloudy size={120} />
      <Heading mb="10px">Weather</Heading>
      <Box display={"flex"}>
        <Box>
          <Heading>Address</Heading>
          <Input
            placeholder="start typing an address"
            data-testid="input-address"
            width={300}
            onChange={addressHandler}
          />
        </Box>

        <Box ml={10}>
          <Heading>Number of days</Heading>
          <Select
            id="number-of-days"
            data-testid="number-of-days-select"
            onChange={onSelectNumberOfDays}
            value={numberOfDays}
            items={daysOptions}
          />
        </Box>
      </Box>

      {addressError && (
        <ErrorInline
          containerProps={{
            mt: 10,
          }}
          message="An error occurred while fetching your address"
        />
      )}

      {forecastError && (
        <ErrorInline
          containerProps={{
            mt: 10,
          }}
          message="An error occurred while fetching the forecast"
          data-testid="forecast-error"
        />
      )}

      {addresses?.length === 0 && (
        <Card>
          <Span>No results found</Span>
        </Card>
      )}

      {(isLoading || isLoadingForecast) && (
        <Card>
          <Span>Loading...</Span>
        </Card>
      )}

      <Box mt={15}>
        <ForecastPeriod period={groupedForecast} />
      </Box>
    </Box>
  );
};
