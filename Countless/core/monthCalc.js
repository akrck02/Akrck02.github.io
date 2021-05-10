
/**
 * Gettmonth name
 * @param {*} index 
 * @returns 
 */
export const getMonth = (index) => {
    switch (index) {
        case 0: return "Enero";
        case 1: return "Febrero";
        case 2: return "Marzo";
        case 3: return "Abril";
        case 4: return "Mayo";
        case 5: return "Junio";
        case 6: return "Julio";
        case 7: return "Agosto";
        case 8: return "Septiembre";
        case 9: return "Octubre";
        case 10: return "Noviembre";
        case 11: return "Diciembre";
        default: return "...";
    }
}

/**
 * Get week day
 * @param {*} index 
 * @returns 
 */
export const getWeekDay = (index) => {
    switch (index) {
        case 0: return "Lunes";
        case 1: return "Martes";
        case 2: return "Miércoles";
        case 3: return "Jueves";
        case 4: return "Viernes";
        case 5: return "Sábado";
        case 6: return "Domingo";
        default: return "...";
    }
}

/**
 * Get week dey letter 
 * @param {*} index 
 * @returns 
 */
export const getWeekDayLetter = (index) => {
    switch (index) {
        case 0: return "L";
        case 1: return "M";
        case 2: return "X";
        case 3: return "J";
        case 4: return "V";
        case 5: return "S";
        case 6: return "D";
        default: return "...";
    }
}

/**
 * Get week day index
 * @param {*} year 
 * @param {*} month 
 * @param {*} day 
 * @returns The weekday index
 */
export const getWeekDayIndex = (year,month,day) =>{
    const date = new Date(year,month,day);
    return date.getDay();
}



/**
 * Get the last day of a month
 * @param {*} year  - The year
 * @param {*} month  - The month
 * @returns The last day of the given month
 */
export const lastday = (year,month) => {
    return  new Date(year, month +1, 0).getDate();
}


export const currentDay = () => new Date().getDate();
export const currentMonth = () => new Date().getMonth();
export const currentYear = () => new Date().getFullYear();