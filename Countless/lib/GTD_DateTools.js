
/**
 * Converts date to JSON
 * @param {Date} date  - The date to convert
 * @returns JSON with all info
 */
export const dateToJSON = (date) => {

    const json = {};
    json.standard = date + "";
    json.day = date.getDate();
    json.weekday = date.getDay();
    json.month = date.getMonth();
    json.year = date.getFullYear();
    json.seconds = date.getSeconds();
    json.milliseconds = date.getMilliseconds();

    return json;
}

/**
 * Creates a date 
 * @param {*} properties 
 */
export const createDate = (properties) => {

    


}