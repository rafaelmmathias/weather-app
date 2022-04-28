import {
  ForecastResponseMock,
  WeatherPointResponseEmpty,
  WeatherPointResponseException,
  WeatherPointResponseMock,
} from "./weatherApi.mock";
import { rest } from "msw";
export const WEATHER_POINT_ENDPOINT =
  "https://api.weather.gov/points/34.244312,-111.31578";

export const FORECAST_ENDPOINT =
  "https://api.weather.gov/gridpoints/FGZ/80,44/forecast";

export const getWeatherPointHandlerSuccess = rest.get(
  WEATHER_POINT_ENDPOINT,
  (req, res, ctx) => {
    return res(ctx.json(WeatherPointResponseMock));
  }
);

const getWeatherPointHandlerEmpty = rest.get(
  WEATHER_POINT_ENDPOINT,
  (req, res, ctx) => {
    return res(ctx.json(WeatherPointResponseEmpty));
  }
);

export const getWeatherPointHandlerException = rest.get(
  WEATHER_POINT_ENDPOINT,
  (req, res, ctx) => {
    return res(ctx.status(500), ctx.json(WeatherPointResponseException));
  }
);

export const getWeatherForecastSuccess = rest.get(FORECAST_ENDPOINT, (req, res, ctx) => {
  return res(ctx.json(ForecastResponseMock));
});

export const weatherApiHandlers = [
  getWeatherPointHandlerSuccess,
  getWeatherPointHandlerEmpty,
  getWeatherPointHandlerException,
  getWeatherForecastSuccess,
];
