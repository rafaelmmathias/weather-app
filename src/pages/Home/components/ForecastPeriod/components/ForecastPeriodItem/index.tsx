import React from "react";
import { Box, Card, Paragraph, Span } from "../../../../../../components";
import { GridpointForecastPeriod } from "../../../../../../services/weather/weather.types";

interface ForecastPeriodItemProps {
  item: GridpointForecastPeriod;
}
export const ForecastPeriodItem: React.FC<ForecastPeriodItemProps> = ({
  item,
}) => {
  return (
    <Card width={"200px"} backgroundColor="#00446A" data-testid="forecast-period-item">
      <Box display={"flex"} flexDirection="column" alignItems={"center"}>
        <img
          alt={item.shortForecast}
          src={item.icon}
          data-testid="forecast-card-item-image"
          width={70}
          style={{ borderRadius: 7 }}
        />
        <Span
          fontSize={20}
          color={"#fff"}
          data-testid="forecast-card-item-name"
        >
          {item.name}
        </Span>
        <Span color="#fff">{item.shortForecast}</Span>
        <Span
          fontSize={40}
          color={"yellow"}
          data-testid="forecast-card-item-temperature"
        >{`${item.temperature}° ${item.temperatureUnit}`}</Span>
        <Box>
          <Paragraph color="#b5e4ff" textAlign="justify">
            {item.detailedForecast}
          </Paragraph>
        </Box>
      </Box>
    </Card>
  );
};
