import { Coordinate } from "../weather/weather.types";

export type BenchmarkTypes = {
  Public_AR_Current: number;
};

export interface Address {
  matchedAddress: string;
  coordinates: Coordinate;
}

export interface GeocoderResponse {
  result: {
    addressMatches: Address[];
  };
}

export type GetAddress = (addressLine: string) => Promise<GeocoderResponse>;
