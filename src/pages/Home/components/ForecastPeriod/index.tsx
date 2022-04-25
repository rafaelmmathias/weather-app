import React from "react";
import { Box } from "../../../../components";
import { GridpointForecastPeriod } from "../../../../services/weather/weather.types";
import { ForecastPeriodItem } from "./components/ForecastPeriodItem";

interface ForecastPeriodProps {
  period?: GridpointForecastPeriod[];
}

export const ForecastPeriod: React.FC<ForecastPeriodProps> = ({ period }) => {
  return period && period?.length > 0 ? (
    <Box display="flex" flexWrap={"wrap"} justifyContent="center">
      {period?.map((item) => (
        <ForecastPeriodItem key={item.name} item={item} />
      ))}
    </Box>
  ) : null;
};
