import { format } from "date-fns";

export const formatISODateToDate = (value: string) => {
    if (typeof value === 'string') {
        const date = new Date(value);

        return new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
        ));
    }

    return value;
};

