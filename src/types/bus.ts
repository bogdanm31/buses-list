export type BusDetails = {
  tripId: string;
  name: string;
  arrival: number;
  delay: number;
  serviceDay: number;
};

export type BusArrival = {
  arrivalDelay: string | number;
  realtimeArrival: string | number;
  serviceDay: string | number;
  trip: {
    id: string | number;
    route: {
      shortName: string
    };
  }
}