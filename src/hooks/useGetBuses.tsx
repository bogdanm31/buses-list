import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { BusArrival } from "../types/bus";

const serializeBuses = (data: any) => {
  const {
    stop: { id, name, stoptimesWithoutPatterns: buses }
  } = data;
  
  return {
    station: { id, name },
    buses: buses.map((bus: BusArrival) => {
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
  }
};

const getBuses = async (station: string) => {
  const busesQueryDocument = `
  {
    stop(id: "${station}") {
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

  const response:any = await apiClient.post('', { query: busesQueryDocument });
  return serializeBuses(response.data.data);
};

export const useGetBuses = (station: string) => useQuery({
  queryFn: () => getBuses(station),
  retry: false
});