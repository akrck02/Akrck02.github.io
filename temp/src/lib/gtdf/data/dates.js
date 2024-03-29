export default class Dates {
    /**
     * Get month difference between two dates
     * @param d1 date 1 (older date)
     * @param d2 date 2 (newer date)
     * @description This method is useful for calculating the difference between two dates.
     * @example
     *      const d1 = new Date(2018, 0, 1);
     *      const d2 = new Date(2018, 1, 1);
     *      const diff = monthDiff(d1, d2);
     *      console.log(diff); // 1
     * @returns number of months between the two dates
     */
    static monthDifference(d1, d2) {
        if (d2 > d1) {
            return -Dates.monthDifference(d2, d1);
        }
        const months = (d2.getFullYear() - d1.getFullYear()) * 12;
        return months + d2.getMonth() - d1.getMonth();
    }
    /**
     * Get if a year is a leap year
     * @param year year to check
     * @description This method is useful for checking if a year is a leap year.
     * @example
     *     const isLeapYear = isLeapYear(2018);
     *     console.log(isLeapYear); // false
     */
    static isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    /**
     * Get if the given date is inside today's range
     * @param date date to check
     * @description This method is useful for checking if a date is inside today's range.
     * @example
     *    const isToday = isToday(new Date());
     *    console.log(isToday); // true
     *
     * @returns true if the date is inside today's range, false otherwise
     */
    static isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    }
    /**
     * Turn a number of seconds into a human readable string
     * @param seconds number of seconds
     * @description This method is useful for converting seconds into a human readable string.
     * @example
     *    const seconds = 3600;
     *    const time = humanize(seconds);
     *    console.log(time); // 1 hour
     
    * @returns human readable string
    */
    static humanize(seconds) {
        if (seconds < Dates.SECONDS_PER_MINUTE) {
            if (seconds === 1)
                return `${seconds} ${Dates.SECOND_STRING}`;
            return `${seconds} ${Dates.SECONDS_STRING}`;
        }
        if (seconds < Dates.SECONDS_PER_HOUR) {
            const minutes = Math.floor(seconds / Dates.SECONDS_PER_MINUTE);
            if (minutes === 1)
                return `${minutes} ${Dates.MINUTE_STRING}`;
            return `${minutes} ${Dates.MINUTES_STRING}`;
        }
        if (seconds < Dates.SECONDS_PER_DAY) {
            const hours = Math.floor(seconds / Dates.SECONDS_PER_HOUR);
            if (hours === 1)
                return `${hours} ${Dates.HOUR_STRING}`;
            return `${hours} ${Dates.HOURS_STRING}`;
        }
        if (seconds < Dates.SECONDS_PER_WEEK) {
            const days = Math.floor(seconds / Dates.SECONDS_PER_DAY);
            if (days === 1)
                return `${days} ${Dates.DAY_STRING}`;
            return `${days} ${Dates.DAYS_STRING}`;
        }
        if (seconds < Dates.SECONDS_PER_DAY * 7) {
            const weeks = Math.floor(seconds / Dates.SECONDS_PER_WEEK);
            if (weeks === 1)
                return `${weeks} ${Dates.WEEK_STRING}`;
            return `${weeks} ${Dates.WEEKS_STRING}`;
        }
        if (seconds < Dates.SECONDS_PER_DAY * 30) {
            const months = Math.floor(seconds / Dates.SECONDS_PER_DAY / 7);
            if (months === 1)
                return `${months} ${Dates.MONTH_STRING}`;
            return `${months} ${Dates.MONTHS_STRING}`;
        }
        const years = Math.floor(seconds / Dates.SECONDS_PER_DAY / 30);
        if (years === 1)
            return `${years} ${Dates.YEAR_STRING}`;
        return `${years} ${Dates.YEARS_STRING}`;
    }
    ;
}
Dates.SECOND_STRING = 'second';
Dates.SECONDS_STRING = 'seconds';
Dates.MINUTE_STRING = 'minute';
Dates.MINUTES_STRING = 'minutes';
Dates.HOUR_STRING = 'hour';
Dates.HOURS_STRING = 'hours';
Dates.DAY_STRING = 'day';
Dates.DAYS_STRING = 'days';
Dates.WEEK_STRING = 'week';
Dates.WEEKS_STRING = 'weeks';
Dates.MONTH_STRING = 'month';
Dates.MONTHS_STRING = 'months';
Dates.YEAR_STRING = 'year';
Dates.YEARS_STRING = 'years';
Dates.SECONDS_PER_MINUTE = 60;
Dates.SECONDS_PER_HOUR = Dates.SECONDS_PER_MINUTE * 60;
Dates.SECONDS_PER_DAY = Dates.SECONDS_PER_HOUR * 24;
Dates.SECONDS_PER_WEEK = Dates.SECONDS_PER_DAY * 7;
