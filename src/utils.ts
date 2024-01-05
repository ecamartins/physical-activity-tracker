import { DateTime } from "luxon";

const MONDAY = 1;
const TUESDAY = 2;
const WEDNESDAY = 3;
const THURSDAY = 4;
const FRIDAY = 5;
const SATURDAY = 6;

export function getStartOfWeek(today: DateTime) {
    var offset = 0;
    switch (today.weekday) {
        // @ts-ignore
        case SATURDAY:
            offset++;
        // @ts-ignore
        case FRIDAY:
            offset++;
        // @ts-ignore
        case THURSDAY:
            offset++;
        // @ts-ignore
        case WEDNESDAY:
            offset++;
        // @ts-ignore
        case TUESDAY:
            offset++;
        // @ts-ignore
        case MONDAY:
            offset++;
        default: // it's Sunday, so offset = 0
            break;
    }

    return today.minus({ days: offset });
}

export function formatDate(day: DateTime, offset: number = 0): string {
    return day.minus({ days: -offset }).toLocaleString({ weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
}
