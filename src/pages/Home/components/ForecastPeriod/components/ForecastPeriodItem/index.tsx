import React from "react";
import { Box, Card, Paragraph, Span } from "components";
import { GridpointForecastPeriod } from "services/weather/weather.types";

import { ForeCastDayCardContainer } from "./forecastPeriodItem.styles";

interface ForecastPeriodItemProps {
  item: {
    name: string;
    value: GridpointForecastPeriod[];
  };
}
export const ForecastPeriodItem: React.FC<ForecastPeriodItemProps> = ({
  item,
}) => {

  return (
    <Card backgroundColor="#00446A">
      <Box display={"flex"} flexWrap="wrap">
        {item.value.map((dayInfo) => (
          <ForeCastDayCardContainer
            key={dayInfo.name}
            backgroundImage={`url(${dayInfo.icon})`}
            data-testid="forecast-period-item"
          >
            <Box padding={10} display={"flex"} justifyContent="space-between">
              <Box display={"flex"} flexDirection="column">
                <Span
                  fontSize={20}
                  color={"#fff"}
                  data-testid="forecast-card-item-name"
                >
                  {dayInfo.name}
                </Span>

                <Span color="#fff">{dayInfo.shortForecast}</Span>
              </Box>
              <Box width={90} display="flex" justifyContent={"flex-end"}>
                <Span
                  fontSize={25}
                  color={"yellow"}
                  data-testid="forecast-card-item-temperature"
                >{`${dayInfo.temperature}° ${dayInfo.temperatureUnit}`}</Span>
              </Box>
            </Box>
            <Box
              backgroundColor={"rgba(0,0,0,0.6)"}
              padding={2}
              overflow="auto"
              maxHeight={110}
            >
              <Paragraph color="#fff" textAlign="justify">
                {dayInfo.detailedForecast}
              </Paragraph>
            </Box>
          </ForeCastDayCardContainer>
        ))}
      </Box>
    </Card>
  );
};
