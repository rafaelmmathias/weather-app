import {
  ForecastResponseMock,
  WeatherPointResponseEmpty,
  WeatherPointResponseMock,
} from "./weatherApi.mock";
import { rest } from "msw";

export const weatherApiHandlers = [
  // Handles a POST /login request
  // rest.post('', null),
  // Handles a GET /user request
  rest.get(
    "https://api.weather.gov/points/34.244312,-111.31578",
    (req, res, ctx) => {
      return res(ctx.json(WeatherPointResponseMock));
    }
  ),

  rest.get(
    "https://api.weather.gov/gridpoints/FGZ/80,44/forecast",
    (req, res, ctx) => {
      return res(ctx.json(ForecastResponseMock));
    }
  ),
];
