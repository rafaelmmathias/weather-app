export interface GridpointForecastPeriod {
  detailedForecast: string;
  shortForecast: string;
  endTime: string;
  icon: string;
  isDaytime: boolean;
  name: string;
  startTime: string;
  temperature: number;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface WeatherPointResponse {
  properties: {
    forecast: string;
    forecastHourly: string;
  };
}

export interface ForecastResponse {
  properties: {
    periods: GridpointForecastPeriod[];
    updateTime: string;
  };
}

export type ForecastByLatLng = (
  coordinates: Coordinate
) => Promise<ForecastResponse>;

export type GetWeatherByLatLng = (
  coordinates: Coordinate
) => Promise<WeatherPointResponse>;
