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

  const { addresses, isLoading, error: addressError } = useAddresses(address);

  const {
    forecast,
    error: forecastError,
    isLoading: isLoadingForecast,
  } = useForecast(addresses ? addresses[0] : undefined);

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
