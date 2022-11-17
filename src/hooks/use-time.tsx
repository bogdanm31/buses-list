import { useCallback } from "react";
import { timeUnits } from "../constants/time";

const useTime = () => {
  const midnightTime = () =>
    new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000;

  const timePassedFromMidnight = useCallback(() => {
    const cts = Math.floor(new Date().getTime()) / 1000;
    const mts = midnightTime();
    return Math.floor((cts - mts) / 60) * 60;
  }, []);

  const toUnits = (num: number, excludeUnits: Array<string> = ["s"]) => {
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
  };

  const toClockString = useCallback((num: number) => {
    const data = toUnits(num);

    return data
      .map((unit) => (unit.value < 10 ? "0" : "") + unit.value)
      .join(":");
  }, []);

  const toTimeString = useCallback((num: number) => {
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
  }, []);

  return {
    midnightTime,
    timePassedFromMidnight,
    toClockString,
    toTimeString
  };
};

export default useTime;
