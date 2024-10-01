import { createContext, ReactNode, useContext, useMemo } from "react";
import { timeUnits } from "../constants/time";
import { TimeUnit } from "../types/time";

export type TimestampContextType = {
  midnightTime: number;
  toClockString: (num: number) => string;
  toTimeString: (num: number) => string;
  toUnits: (num: number, excludeUnits: string[]) => TimeUnit[];
};

export const TimestampContext = createContext({} as TimestampContextType);

type Props = {
  children: ReactNode
};

export const TimestampContextProvider = ({ children }: Props) => {
  const midnightTime = useMemo(() => {
    return new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;
  }, []);

  const toUnits = (num: number, excludeUnits: string[] = ["s"]) => {
    let index = 0;
    const data = timeUnits.map((item) => ({
      ...item,
      value: 0
    }));

    while (num) {
      const t = num % 60;
      data[index].value = t;
      num -= t;
      num /= 60;
      index++;
    }

    return data.reverse().filter((unit) => !excludeUnits.includes(unit.symbol));
  }

  const toClockString = (num: number) => {
    const data = toUnits(num);

    return data
      .map((unit) => (unit.value < 10 ? "0" : "") + unit.value)
      .join(":");
  };

  const toTimeString = (num: number) => {
    const data = toUnits(num);

    return data
      .filter((unit) => !!unit.value)
      .map(
        (unit) =>
          `${unit.value} ${
            unit.value === 1 ? unit.name.singular : unit.name.plural
          }`
      )
      .join(" ");
  }

  const value = {
    midnightTime,
    toClockString,
    toTimeString,
    toUnits
  };

  return (
    <TimestampContext.Provider value={value}>
      {children}
    </TimestampContext.Provider>
  );
};

export const useTimestampContext = () => useContext(TimestampContext);