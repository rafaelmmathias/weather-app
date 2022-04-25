import { Address } from "./../services/geocoder/geocoding.types";
import useSWR from "swr";
import {
  getPeriodForecast,
  getWeatherByLatLng,
} from "../services/weather/weather";

export const useForecast = (address?: Address) => {
  const { data: weatherPoint, error: weatherPointError } = useSWR(
    address?.coordinates,
    getWeatherByLatLng,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: forecastResponse, error } = useSWR(
    weatherPoint?.properties.forecast,
    getPeriodForecast
  );

  return {
    forecast: forecastResponse?.properties,
    isLoading: !error && !forecastResponse && address,
    error: error || weatherPointError,
  };
};
