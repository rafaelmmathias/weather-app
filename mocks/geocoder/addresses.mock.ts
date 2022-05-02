import { GeocoderResponse } from "services/geocoder/geocoding.types";

export const emptyResult = {
  result: {
    input: {
      benchmark: {
        id: "4",
        benchmarkName: "Public_AR_Current",
        benchmarkDescription: "Public Address Ranges - Current Benchmark",
        isDefault: false,
      },
      address: { address: "empty" },
    },
    addressMatches: [],
  },
};

export const withResults: GeocoderResponse = {
  result: {
    addressMatches: [
      {
        matchedAddress: "501 E LORENE ST, PAYSON, AZ, 85541",
        coordinates: { x: -111.31578, y: 34.244312 },
      },
    ],
  },
};