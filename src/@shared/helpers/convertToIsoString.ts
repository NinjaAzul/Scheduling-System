export const convertToISOString = (timeData: { hours: string; day: string }): string => {

    const [day, month, year] = timeData.day.split('/');

    const date = new Date(`${year}-${month}-${day}T${timeData.hours}:00Z`);

    return date.toISOString();
};