import { useEffect, useState } from "react";

import useHttp from "../../../hooks/use-http";
import useTime from "../../../hooks/use-time";

import { BusArrival, BusDetails } from "../../../types/bus";
import { Station } from "../../../types/station";

import Bus from "../busItem/Bus";

const BusesQueryDocument = `
query buses($id: String!) {
  stop(id: "HSL:1201110") {
    name stoptimesWithoutPatterns {
      trip {
        id
        route {
          shortName
        }
      }
      realtimeArrival
      arrivalDelay
      serviceDay
    }
  }
}`;

const Buses = ({ timestamp }: { timestamp: number }) => {
  const [buses, setBuses] = useState<BusDetails[]>([]);
  const [station, setStation] = useState<Station>({ id: undefined, name: undefined });
  const [busLeft, setBusLeft] = useState<boolean>(true);

  const { httpRequest: fetchBuses, isLoading, error } = useHttp();
  const [midnightTime] = useState(useTime().midnightTime());

  useEffect(() => {
    if (!busLeft || isLoading) {
      return;
    }
    const busListTransformer = (data: any) => {
      const {
        stop: { id, name, stoptimesWithoutPatterns: buses }
      } = data;
      setStation({ id, name });
      setBuses(
        buses.map((bus: BusArrival) => {
          const {
            arrivalDelay: delay,
            realtimeArrival: arrival,
            serviceDay,
            trip: {
              id: tripId,
              route: { shortName: name }
            }
          } = bus;
          return {
            tripId,
            name,
            arrival,
            delay,
            serviceDay
          };
        })
      );
    };

    fetchBuses({ query: BusesQueryDocument }, busListTransformer);

    setBusLeft(false);
  }, [isLoading, buses, busLeft, setBusLeft, fetchBuses]);

  return (
    <>
      <div className="page-title h2 fb mb-1_5 mb-lg-5" data-testid="page-title">
        Buses ariving to
      </div>
      <div
        className="px-lg-1 h1 biggest-lg fb mb-2_5"
        data-testid="loading-msg"
      >
        {isLoading ? "Loading..." : station.name}
      </div>

      {error ? <p data-testid="buses-error">{error}</p> : ""}
      {!error && !isLoading ? (
        <div className="px-lg-1">
          <ul className="buses-list" data-testid="buses-list">
            {buses.map((bus) => (
              <li key={bus.tripId}>
                <Bus
                  bus={bus}
                  midnightTime={midnightTime}
                  timestamp={timestamp}
                  onLeave={() => setBusLeft(true)}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Buses;
