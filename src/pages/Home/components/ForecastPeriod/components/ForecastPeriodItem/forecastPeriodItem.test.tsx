import { render, screen } from "@testing-library/react";
import { ForecastPeriodItem, ForecastPeriodItemProps } from ".";
import renderer from "react-test-renderer";

let mockedProps: ForecastPeriodItemProps = {
  item: {
    name: "Today",
    value: [
      {
        detailedForecast: "Partly sunny. High near 98",
        endTime: "2022-04-26T18:00:00-07:00",
        icon: "fakeIcon",
        isDaytime: true,
        name: "Today",
        shortForecast: "Partly Sunny",
        startTime: "2022-04-26T12:00:00-07:00",
        temperature: 98,
        temperatureUnit: "F",
        windDirection: "SSW",
        windSpeed: "5 to 10 mph",
      },
    ],
  },
};

test("expected to render the forecast title and detailed text", () => {
  render(<ForecastPeriodItem {...mockedProps} />);

  const titleElement = screen.getByText(/Today/i);
  const detailedForecast = screen.getByText(/Partly sunny. High near 98/i);

  expect(titleElement).toBeInTheDocument();
  expect(detailedForecast).toBeInTheDocument();
});

test("expected to render correctly when have just 1 item", () => {
  const tree = renderer
    .create(<ForecastPeriodItem {...mockedProps} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("expected to render correctly when have more than 1", () => {
  let _mockedPropss: ForecastPeriodItemProps = JSON.parse(
    JSON.stringify(mockedProps)
  );

  _mockedPropss.item.value.push({
    detailedForecast: "detailed 2",
    endTime: "2022-04-26T18:00:00-07:00",
    icon: "second fakeIcon",
    isDaytime: true,
    name: "Tonight",
    shortForecast: "Partly Sunny",
    startTime: "2022-04-26T12:00:00-07:00",
    temperature: 78,
    temperatureUnit: "F",
    windDirection: "SSW",
    windSpeed: "5 to 10 mph",
  });

  const tree = renderer
    .create(<ForecastPeriodItem {..._mockedPropss} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
