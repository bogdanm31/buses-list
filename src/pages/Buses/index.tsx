import React, { useEffect, useState } from "react";

import { useGetBuses } from "../../hooks/useGetBuses";
import { useTimestamp } from "../../hooks/useTimestamp";
import { useTimestampContext } from "../../contexts/TimestampContext";

import { BusDetails } from "../../types/bus";
import { Station } from "../../types/station";

import Bus from "../../components/buses/busItem/Bus";

const Buses = () => {
  const { midnightTime } = useTimestampContext();
  const { timePassedFromMidnight } = useTimestamp();

  const [buses, setBuses] = useState<BusDetails[]>([]);
  const [station, setStation] = useState<Station>({ id: undefined, name: undefined });
  const [busLeft, setBusLeft] = useState<boolean>(true);

  const { data, isLoading, error } = useGetBuses('HSL:1201110');

  useEffect(() => {
    if (!busLeft || isLoading || !data) {
      return;
    }

    setBuses(data.buses);
    setStation(data.station);

    setBusLeft(false);
  }, [data, isLoading, busLeft]);

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

      {error ? <p data-testid="buses-error">{(error as any).message}</p> : ""}
      {!error && !isLoading ? (
        <div className="px-lg-1">
          <ul className="buses-list" data-testid="buses-list">
            {buses.map((bus) => (
              <li key={bus.tripId}>
                <Bus
                  bus={bus}
                  midnightTime={midnightTime}
                  timestamp={timePassedFromMidnight}
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
