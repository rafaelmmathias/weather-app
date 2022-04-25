import { setupServer } from "msw/node";
import { geocoderHandlers } from "./geocoder/handlers";
import { weatherApiHandlers } from "./weatherApi/handlers";
// This configures a request mocking server with the given request handlers.
export const server = setupServer(
  ...[...geocoderHandlers, ...weatherApiHandlers]
);
