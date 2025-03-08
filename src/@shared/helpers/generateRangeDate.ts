export const generateRangeDate = (
  valueFrom: string | undefined | Date,
  valueTo: string | undefined | Date,
) => {
  if (!valueFrom || !valueTo) {
    return {
      initialDate: undefined,
      finalDate: undefined,
    };
  }

  const createDateWithTime = (value: string | Date, hours: number, minutes: number, seconds: number, milliseconds: number) => {
    if (typeof value === 'string' && value.length === 10) {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));
    }

    const date = new Date(value);
    return new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      hours,
      minutes,
      seconds,
      milliseconds
    ));
  };

  return {
    initialDate: createDateWithTime(valueFrom, 0, 0, 0, 0),
    finalDate: createDateWithTime(valueTo, 23, 59, 59, 999),
  };
};