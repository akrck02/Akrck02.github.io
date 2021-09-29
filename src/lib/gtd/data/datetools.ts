/**
 * Converts date to JSON
 * @param {Date} date  - The date to convert
 * @returns JSON with all info
 */
 export function dateToJSON (date : Date) : object {

    const json = {
        standard: date.toISOString(),
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds()
    };

    return json;
}
