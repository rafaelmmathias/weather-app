import { emptyResult, withResults } from "./addresses.mock";
import { rest } from "msw";
export const GEOLOCATION_ENDPOINT = "http://localhost:3001/";

export const getAddressWithResultsHandler = rest.get(
  GEOLOCATION_ENDPOINT,
  (req, res, ctx) => {
    return res(ctx.json(withResults));
  }
);

export const getAddressEmptyHandler = rest.get(
  GEOLOCATION_ENDPOINT,
  (req, res, ctx) => {
    return res(ctx.json(emptyResult));
  }
);

export const getAddressExceptionHandler = rest.get(
  GEOLOCATION_ENDPOINT,
  (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({}));
  }
);

export const geocoderHandlers = [
  getAddressWithResultsHandler,
  getAddressEmptyHandler,
  getAddressExceptionHandler
];
