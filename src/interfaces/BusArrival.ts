import { StringOrNr } from "../types/string-number";

export default interface BusArrival {
  arrivalDelay: StringOrNr;
  realtimeArrival: StringOrNr;
  serviceDay: StringOrNr;
  trip: {
    id: StringOrNr;
    route: {
      shortName: string
    };
  }
}