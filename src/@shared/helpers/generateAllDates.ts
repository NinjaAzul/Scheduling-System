export const generateAllDates = (fromDate: Date, toDate: Date): Date[] => {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const dates = [];

  while (start <= end) {
    dates.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }

  return dates as Date[];
};
