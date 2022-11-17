import { render, screen } from "@testing-library/react";
import Bus from "./Bus";

const hour = 14,
  minute = 30,
  timestamp = hour * 3600 + minute * 60;

const bus = {
  tripId: "a1213",
  name: "15",
  arrival: timestamp + 60,
  delay: 0,
  serviceDay: 1668031200,
  midnightTime: 1668031200
};

const renderComponent = (options: {} = {}) =>
  render(
    <Bus
      bus={{ ...bus, ...options }}
      midnightTime={1668031200}
      timestamp={timestamp}
      onLeave={() => {}}
    />
  );

describe("MainHeader component", () => {
  test("renders icon", () => {
    renderComponent();

    const icon = screen.getByTestId("icon");
    expect(icon).toBeTruthy();
  });

  test("renders bus name, no delay", () => {
    renderComponent();

    const busCell = screen.getByTestId("bus");
    expect(busCell).toBeTruthy();
    expect(busCell.textContent).toContain(bus.name);
  });

  test("renders bus name cell content, with delay", () => {
    const delay = 2;
    renderComponent({ delay });

    const busCell = screen.getByTestId("bus");
    expect(busCell).toBeTruthy();
    expect(busCell.textContent).toContain(`${delay} minutes late`);
  });

  test("renders bus arrival and time left", () => {
    renderComponent();

    const arrival = screen.getByTestId("arrival");
    expect(arrival).toBeTruthy();

    expect(arrival.textContent).toContain(
      `In 1 minute / ${hour}:${minute + 1}`
    );
  });
});
