
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
 * Get the last day of a month
 * @param {*} y  - The year
 * @param {*} m  - The month
 * @returns The last day of the given month
 */
export const lastday = (y,m) => {
    return  new Date(y, m +1, 0).getDate();
}