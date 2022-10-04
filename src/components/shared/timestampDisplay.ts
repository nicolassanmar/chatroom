export const timestampDisplay = (dateTime: Date): string => {
  const formatter = new Intl.RelativeTimeFormat("en", {});
  const now = new Date();
  const diff = now.getTime() - dateTime.getTime();

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;

  const intervals: {
    greaterThan: number;
    divisor: number;
    unit: Intl.RelativeTimeFormatUnit;
  }[] = [
    { greaterThan: HOUR, divisor: HOUR, unit: "hour" },
    { greaterThan: MINUTE, divisor: MINUTE, unit: "minute" },
    { greaterThan: 0, divisor: SECOND, unit: "seconds" },
  ];

  if (diff <= 24 * HOUR) {
    for (const interval of intervals) {
      if (diff >= interval.greaterThan) {
        const x = Math.round(Math.abs(diff) / interval.divisor);
        return formatter.format(-x, interval.unit);
      }
    }
  }

  // More than a day ago
  return dateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h12",
    minute: "numeric",
  });
};
