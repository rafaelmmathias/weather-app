import { emptyResult, withResults } from "./addresses.mock";
import { rest } from "msw";

export const geocoderHandlers = [
  // Handles a POST /login request
  // rest.post('', null),
  // Handles a GET /user request
  rest.get("http://localhost:3001/", (req, res, ctx) => {
    if (req.url.searchParams.get("address")?.includes("with result")) {
      return res(ctx.json(withResults));
    }

    return res(ctx.json(emptyResult));
  }),
];
