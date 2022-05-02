import { groupBy } from "lodash";
import { GridpointForecastPeriod } from "services/weather/weather.types";

const dayNames = [
  { name: "Today", matches: ["Today", "Tonight", "Overnight", "This Afternoon"] },
  { name: "Tuesday", matches: ["Tuesday", "Tuesday Night"] },
  { name: "Wednesday", matches: ["Wednesday", "Wednesday Night"] },
  { name: "Thursday", matches: ["Thursday", "Thursday Night"] },
  { name: "Friday", matches: ["Friday", "Friday Night"] },
  { name: "Saturday", matches: ["Saturday", "Saturday Night"] },
  { name: "Sunday", matches: ["Sunday", "Sunday Night"] },
];

const findDayByAlias = (name: string) =>
  dayNames.find((couple) => couple.matches.includes(name))?.name ||
  "Unknown day";

export const groupForecastPeriodByDay = (
  period?: GridpointForecastPeriod[]
) => {
  const grouped = groupBy(period, ({ name }) => findDayByAlias(name));
  
  return Object.entries(grouped).map(([key, value]) => ({
    name: key,
    value,
  }));
};
