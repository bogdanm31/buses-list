import { useEffect } from "react";

import "./bus.scss";
import Card from "../../ui/card/Card";

import busImg from "../../../img/bus.svg";
import useTime from "../../../hooks/use-time";
import { BusDetails } from "../../../types/bus";

const Bus = ({
  bus: { name, arrival, delay, serviceDay },
  midnightTime,
  timestamp,
  onLeave
}: {
  bus: BusDetails;
  timestamp: number;
  midnightTime: number;
  onLeave: Function;
}) => {
  const { toTimeString, toClockString } = useTime();
  const remaining = arrival + serviceDay - (timestamp + midnightTime);

  useEffect(() => {
    if (remaining <= 0) {
      onLeave();
    }
  }, [onLeave, remaining]);

  return (
    <Card
      className={`bus-item${delay ? " delayed" : ""}`}
      data-testid="bus-card"
    >
      <div className="row align-items-center">
        <div className="col-auto font-0" data-testid="icon">
          <img src={busImg} alt="" />
        </div>
        <div className="row col pl-0">
          <div className="col-12 col-lg pl-0_5" data-testid="bus">
            {name} {delay ? `(${toTimeString(delay * 60)} late)` : ""}
          </div>
          <div
            className="col-12 col-lg-auto pl-0_5 text-gray-light body2"
            data-testid="arrival"
          >
            In {toTimeString(remaining)} / {toClockString(arrival)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Bus;
