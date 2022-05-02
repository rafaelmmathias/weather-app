import { Address } from "services/geocoder/geocoding.types";
import useSWR from "swr";
import {
  getPeriodForecast,
  getWeatherByLatLng,
} from "services/weather/weather";

export const useForecast = (address?: Address, numberOfDays?: number) => {
  const { data: weatherPoint, error: weatherPointError } = useSWR(
    address?.coordinates,
    getWeatherByLatLng,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const forecastUrl = weatherPoint?.properties.forecast;
  const { data: forecastResponse, error } = useSWR(
    forecastUrl ? [weatherPoint?.properties.forecast, numberOfDays] : undefined,
    getPeriodForecast
  );

  return {
    forecast: forecastResponse?.properties,
    isLoading: !error && !forecastResponse && address,
    error: error || weatherPointError,
  };
};
