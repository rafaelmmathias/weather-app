import React, { useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { WiDayCloudy } from "react-icons/wi";

import { Box, Card, ErrorInline, Input, Span, Heading } from "components";
import { useAddresses } from "hooks/useAddresses";
import { useForecast } from "hooks/useForecast";
import { groupForecastPeriodByDay } from "utils/utils";

import { ForecastPeriod } from "./components/ForecastPeriod";

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

  return (
    <Box
      marginTop={50}
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
    >
      <WiDayCloudy size={120} />
      <Heading mb="10px">Weather</Heading>
      <Input
        placeholder="start typing an address"
        data-testid="input-address"
        width={300}
        onChange={addressHandler}
      />
      <select onChange={onSelectNumberOfDays} value={numberOfDays}>
        <option value={1}>1 day</option>
        <option value={2}>2 days</option>
        <option value={3}>3 days</option>
        <option value={4}>4 days</option>
        <option value={5}>5 days</option>
        <option value={6}>6 days</option>
        <option value={7}>7 days</option>
      </select>

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
