import { DateTime } from "luxon";

export function getCurrentIntervalStart() {
  const currentTime = DateTime.local()
    .setZone("utc", { keepLocalTime: true })
    .startOf("minute");
  const difference = currentTime.minute % 15;
  if (difference !== 0) {
    return currentTime.minus({ minutes: difference });
  }
  return currentTime;
}
