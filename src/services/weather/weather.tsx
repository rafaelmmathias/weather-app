import axios from "axios";
import {
  ForecastResponse,
  GetWeatherByLatLng,
  WeatherPointResponse,
} from "./weather.types";

const weatherApiInstance = axios.create({
  baseURL: "https://api.weather.gov",
});

export const getWeatherByLatLng: GetWeatherByLatLng = async ({ x, y }) => {
  const data = await weatherApiInstance.get<WeatherPointResponse>(
    `/points/${y},${x}`
  );
  return data.data;
};

export const getPeriodForecast = async (
  forecastUrl: string,
  numberOfDays: number
) => {
  const { data } = await weatherApiInstance.get<ForecastResponse>(forecastUrl);
 
  const slicedData: ForecastResponse = {
    properties: {
      ...data.properties,
      periods: data.properties.periods.slice(0, numberOfDays * 2),
    },
  };

  return slicedData;
};
